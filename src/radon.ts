import { getEnumNames } from './utils'

import {
  Markup,
  Mir,
  MirSource,
  MirScript,
  MirOperator,
  OperatorInfo,
  MarkupSelect,
  MarkupType,
  MarkupHierarchicalType,
  OperatorCode,
  MirArgument,
  MarkupOption,
  TypeSystemValue,
  MarkupSelectedOption,
  MarkupInput,
  MirArgumentKind,
  FilterArgument,
  OutputType,
  Reducer,
  Filter,
  TypeSystemEntry,
  CacheRef,
  MarkupRequest,
  MarkupSource,
  MarkupScript,
  MarkupOperator,
  MarkupArgument,
  CachedMarkupSelectedOption,
  CachedArgument,
  CachedMarkup,
  CachedMarkupSelect,
  CachedMarkupScript,
  CachedMarkupRequest,
  CachedMarkupSource,
  CachedMarkupOperator,
  OperatorName,
  ArgumentInfo,
  ScriptCacheRef,
} from './types'

import { Cache, operatorInfos, typeSystem } from './structures'
import { markup2mir, findOperatorCode } from './markup2mir'

const filterArgumentOptions = generateFilterArgumentOptions()
const reducerArgumentOptions = generateReducerArgumentOptions()

// TODO: Create factory functions to remove code repetition
export class Radon {
  private cache: Cache<CachedMarkupSelectedOption | CachedArgument | MarkupSelect>
  private cachedMarkup: CachedMarkup
  private scriptCache: Cache<Array<number>>

  constructor(mir?: Mir) {
    this.cache = new Cache()
    this.scriptCache = new Cache()

    const defaultRequest = {
      description: '',
      name: '',
      radRequest: {
        timelock: 0,
        retrieve: [
          {
            script: this.saveScriptCache([]),
            url: '',
            kind: '',
          },
        ],
        aggregate: this.saveScriptCache([]),
        tally: this.saveScriptCache([]),
      },
    }

    this.cachedMarkup = mir ? this.mir2markup(mir) : defaultRequest
  }

  /**
   * Public class methods
   */

  // Convert a mir request into a cached markup request
  public mir2markup(mir: Mir): CachedMarkup {
    const aggregateScript: ScriptCacheRef = this.saveScriptCache(
      this.generateMarkupScript(mir.radRequest.aggregate, this.scriptCache.getLastIndex())
    )

    const tallyScript: ScriptCacheRef = this.saveScriptCache(
      this.generateMarkupScript(mir.radRequest.tally, this.scriptCache.getLastIndex())
    )
    const radRequest: CachedMarkupRequest = {
      timelock: mir.radRequest.timelock,
      retrieve: mir.radRequest.retrieve.map((source: MirSource) => {
        let generatedMarkupScript: ScriptCacheRef = this.saveScriptCache(
          this.generateMarkupScript(source.script, this.scriptCache.getLastIndex())
        )
        return {
          url: source.url,
          script: generatedMarkupScript,
        } as CachedMarkupSource
      }),
      aggregate: aggregateScript,
      tally: tallyScript,
    }
    this.cachedMarkup = {
      name: mir.name,
      description: mir.description,
      radRequest,
    } as CachedMarkup

    return this.cachedMarkup
  }

  // Get the mir request from the internal cached markup
  public getMir() {
    return markup2mir(this.getMarkup())
  }

  // Generate a radon markup from the internal cached markup
  public getMarkup(): Markup {
    const cachedRadRequest = this.cachedMarkup.radRequest

    const radRequest: MarkupRequest = {
      timelock: cachedRadRequest.timelock,
      retrieve: cachedRadRequest.retrieve.map(source => this.unwrapSource(source)),
      aggregate: this.unwrapScript(
        this.readScriptCache(cachedRadRequest.aggregate.id).map(id => ({ id }))
      ),
      tally: this.unwrapScript(this.readScriptCache(cachedRadRequest.tally.id).map(id => ({ id }))),
    }

    return {
      description: this.cachedMarkup.description,
      name: this.cachedMarkup.name,
      radRequest,
    }
  }

  // Push a new retrieval source
  public addSource() {
    const scriptIndex = this.scriptCache.getLastIndex()
    const scripCachetRef = this.saveScriptCache(this.generateMarkupScript([0x75], scriptIndex))

    this.cachedMarkup.radRequest.retrieve.push({
      script: scripCachetRef,
      url: '',
    } as CachedMarkupSource)
  }

  // Push a new operator in a script
  public addOperator(scriptId: number) {
    const cacheByScriptId = this.readScriptCache(scriptId)
    const lastOperatorRef = cacheByScriptId[cacheByScriptId.length - 1]
    const cachedSelected: CachedMarkupOperator = this.readCache({
      id: lastOperatorRef,
    }) as CachedMarkupOperator
    const outputType: OutputType = Array.isArray(cachedSelected.outputType)
      ? cachedSelected.outputType[0]
      : cachedSelected.outputType
    let mirOperator: MirOperator = 0x70
    if (outputType === OutputType.Boolean) {
      mirOperator = [0x10, '', '']
    } else if (outputType === OutputType.Integer) {
      mirOperator = 0x20
    } else if (outputType === OutputType.Float) {
      mirOperator = 0x30
    } else if (outputType === OutputType.String) {
      mirOperator = 0x40
    } else if (outputType === OutputType.Array) {
      mirOperator = 0x50
    } else if (outputType === OutputType.Map) {
      mirOperator = 0x60
    } else if (outputType === OutputType.Bytes) {
      mirOperator = 0x70
    } else if (outputType === OutputType.Result) {
      mirOperator = 0x80
    } else if (outputType === OutputType.Inner) {
      mirOperator = 0x70
    } else if (outputType === OutputType.Argument) {
      mirOperator = 0x70
    } else if (outputType === OutputType.Passthrough) {
      mirOperator = 0x70
    }
    // TODO: move this Cache logic to its own Cache method
    // Generate markup operator with operator
    const cachedMarkupOperator = this.generateMarkupOperator(mirOperator, scriptId)
    const operatorRef = this.writeCache(cachedMarkupOperator)
    const newCacheScript = this.readScriptCache(scriptId)
    newCacheScript.push(operatorRef.id)
    this.updateScriptCache(scriptId, newCacheScript)
  }

  // Delete a retrieval source
  public deleteSource(index: number) {
    if (this.cachedMarkup.radRequest.retrieve[index]) {
      this.cachedMarkup.radRequest.retrieve.splice(index, 1)
    }
  }

  // Update the url of a source
  public updateSource(url: string, index: number) {
    this.cachedMarkup.radRequest.retrieve[index].url = url
  }

  // Update the markup request with the given value
  public updateMarkup(id: number, value: number | string | boolean): Markup {
    const cachedItem = this.readCache({ id })
    if (cachedItem.markupType === MarkupType.Input) {
      this.updateMarkupInput(id, cachedItem, value)
    } else {
      // TODO: remove casting. We sshould store only select instead of select|selected
      this.updateMarkupSelect(id, cachedItem as CachedMarkupSelect, value as OperatorName)
    }
    return this.getMarkup()
  }

  /**
   * Private methods
   */

  // TODO: convert these methods into a private ones

  // Update a markup input with the given value
  public updateMarkupInput(id: number, cachedInput: MarkupInput, value: number | string | boolean) {
    const newCacheInput: MarkupInput = { ...cachedInput, value }
    this.updateCache(id, newCacheInput)
  }

  // TODO: Split in two functions
  // Update a markup select with the given value and remove operators to continue being valid
  public updateMarkupSelect(
    id: number,
    cachedSelect: CachedMarkupSelect,
    value: OperatorName | Filter | Reducer
  ) {
    if (cachedSelect.hierarchicalType === MarkupHierarchicalType.Operator) {
      const operatorCode: MirOperator = findOperatorCode(
        value as OperatorName,
        cachedSelect.options.map(option => option.label)
      )

      const operatorInfo: OperatorInfo = operatorInfos[operatorCode]
      const defaultArgs: Array<MirArgument> = operatorInfo.arguments.map(arg =>
        getDefaultMirArgument(arg)
      )
      const newSelected = this.generateSelectedOption(
        operatorInfo,
        operatorCode,
        defaultArgs,
        cachedSelect.scriptId
      )
      const newCacheSelect: CachedMarkupSelect = {
        ...cachedSelect,
        outputType: newSelected.outputType,
      }
      this.updateCache(id, newCacheSelect)
      //TODO: only cache select indstread of select and selected
      this.updateCache(cachedSelect.selected.id, newSelected)

      const oldOutputType = cachedSelect.outputType
      const newOutputType = newSelected.outputType

      if (newOutputType !== oldOutputType) {
        this.removeNextOperators(cachedSelect.scriptId, id)
      }
    } else {
      const newCacheSelect: CachedMarkupSelect = {
        ...cachedSelect,
        label: value,
      } as CachedMarkupSelect
      const oldSelected: CachedMarkupSelectedOption = this.readCache({
        id,
      }) as CachedMarkupSelectedOption
      const newSelected: CachedMarkupSelectedOption = {
        ...oldSelected,
        label: value,
      } as CachedMarkupSelectedOption

      this.updateCache(id, newCacheSelect)
      //TODO: only cache select instead of select and selected
      this.updateCache(cachedSelect.selected.id, newSelected)
    }
  }

  // TODO: cache scriptCache
  // Remove from a script the operators that are after the desired one
  public removeNextOperators(scriptId: number, idToRemove: number) {
    const index = this.readScriptCache(scriptId).findIndex(x => x === idToRemove)
    const newScript = this.readScriptCache(scriptId).slice(0, index + 1)
    this.updateScriptCache(scriptId, newScript)
  }

  // Create a cached markup script
  public generateMarkupScript(script: MirScript, scriptId: number): CachedMarkupScript {
    const markupScript: CachedMarkupScript = script.map((operator: MirOperator) => {
      return this.writeCache(this.generateMarkupOperator(operator, scriptId))
    })

    return markupScript
  }

  // Create a cached markup operator
  public generateMarkupOperator(operator: MirOperator, scriptId: number): CachedMarkupOperator {
    const { code, args } = this.getMirOperatorInfo(operator)
    const operatorInfo: OperatorInfo = operatorInfos[code]
    const outputType = this.findOutputType(code)

    const markupOperator: CachedMarkupSelect = {
      id: 0,
      scriptId,
      markupType: MarkupType.Select,
      hierarchicalType: MarkupHierarchicalType.Operator,
      outputType,
      selected: this.writeCache(
        this.generateSelectedOption(operatorInfo, code, args, scriptId)
      ),
      options: this.generateMarkupOptions(operatorInfo, code, args),
    }

    return markupOperator
  }

  // Create a cached markup selected option
  public generateSelectedOption(
    operatorInfo: OperatorInfo,
    code: OperatorCode,
    args: Array<MirArgument> | null,
    scriptId: number
  ): CachedMarkupSelectedOption {
    const outputType = this.findOutputType(code)
    const markupSelectedOption: CachedMarkupSelectedOption = {
      arguments:
        args && args.length ? this.generateOperatorArguments(operatorInfo, args, scriptId) : [],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      label: operatorInfo.name,
      markupType: MarkupType.Option,
      // TODO: Add support for pseudotypes
      outputType: outputType,
    }

    return markupSelectedOption
  }

  // Create and save in cache a list of markup operator arguments
  public generateOperatorArguments(
    operatorInfo: OperatorInfo,
    args: Array<MirArgument>,
    scriptId: number
  ): Array<CacheRef> {
    const operatorArguments: Array<CacheRef> = args.map((argument: MirArgument, index: number) => {
      let argumentInfo = operatorInfo.arguments[index]
      switch (argumentInfo.type) {
        // TODO: Add support for pseudotypes
        case MirArgumentKind.Array:
        case MirArgumentKind.Boolean:
        case MirArgumentKind.Bytes:
        case MirArgumentKind.Mapper:
        case MirArgumentKind.Passthrough:
        case MirArgumentKind.Result:
        case MirArgumentKind.Float:
        case MirArgumentKind.Inner:
        case MirArgumentKind.Integer:
        case MirArgumentKind.Map:
        case MirArgumentKind.String:
          return this.writeCache(
            this.generateInputArgument(argument as string | number | boolean, argumentInfo.name)
          )
        case MirArgumentKind.Filter:
          return this.writeCache(
            this.generateFilterArgument(argumentInfo.name, argument as FilterArgument, scriptId)
          )
        case MirArgumentKind.Reducer:
          return this.writeCache(
            this.generateReducerArgument(argumentInfo.name, argument as Reducer, scriptId)
          )
      }
    })
    return operatorArguments
  }

  // Create a markup input argument
  public generateInputArgument(value: string | number | boolean, label: string): MarkupInput {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      label,
      markupType: MarkupType.Input,
      value,
    } as MarkupInput
  }

  // Create a cached markup filter argument
  public generateFilterArgument(
    label: string,
    filter: FilterArgument,
    scriptId: number
  ): CachedMarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      markupType: MarkupType.Select,
      options: filterArgumentOptions,
      scriptId,
      label,
      selected: this.writeCache(this.generateSelectedFilterArgument(filter)),
    } as CachedMarkupSelect
  }

  // Create a cached markup reducer argument
  public generateReducerArgument(
    label: string,
    reducer: Reducer,
    scriptId: number
  ): CachedMarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      markupType: MarkupType.Select,
      options: reducerArgumentOptions,
      outputType: OutputType.Bytes,
      scriptId,
      label,
      selected: this.writeCache(this.generateSelectedReducerArgument(reducer)),
    } as CachedMarkupSelect
  }

  // Create a cached markup selected filter argument
  public generateSelectedFilterArgument(
    filterArgument: FilterArgument
  ): CachedMarkupSelectedOption {
    const filter: Filter = filterArgument[0]
    const argument = filterArgument[1]
    const selectedArgument: CachedMarkupSelectedOption = {
      arguments: [this.writeCache(this.generateInputArgument(argument, 'by'))],
      label: Filter[filter],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
    return selectedArgument
  }

  // Replace cache references of the given source creating a markup source
  public unwrapSource(source: CachedMarkupSource): MarkupSource {
    const markupSource: MarkupSource = {
      kind: source.kind,
      url: source.url,
      script: this.unwrapScript(this.readScriptCache(source.script.id).map(id => ({ id }))),
    }

    return markupSource
  }

  // Replace cache references of the given script creating a markup script
  public unwrapScript(script: Array<CacheRef>): MarkupScript {
    const markupScript: MarkupScript = script.map(operatorRef => {
      const cachedOperator: CachedMarkupOperator = (this.readCache(
        operatorRef
      ) as unknown) as CachedMarkupOperator
      const operator: MarkupOperator = this.unwrapOperator(cachedOperator, operatorRef.id)

      return operator
    })
    return markupScript
  }

  // Replace cache references of the given operator creating a markup operator
  public unwrapOperator(operator: CachedMarkupOperator, id: number): MarkupOperator {
    const markup: MarkupOperator = {
      hierarchicalType: operator.hierarchicalType,
      id: id,
      label: operator.label,
      markupType: operator.markupType,
      options: operator.options,
      outputType: operator.outputType,
      scriptId: operator.scriptId,
      selected: this.unwrapSelectedOption(operator.selected),
    }
    return markup
  }

  // Read a selected option from the cache and replace its cache references creating a markup selected option
  public unwrapSelectedOption(selectedOption: CacheRef): MarkupSelectedOption {
    const cachedSelectedOption: CachedMarkupSelectedOption = this.readCache(
      selectedOption
    ) as CachedMarkupSelectedOption

    const markup: MarkupSelectedOption = {
      arguments: cachedSelectedOption.arguments.length
        ? (cachedSelectedOption.arguments as Array<CacheRef>).map((argument: CacheRef) => {
            return this.unwrapArgument(argument)
          })
        : [],
      hierarchicalType: cachedSelectedOption.hierarchicalType,
      label: cachedSelectedOption.label,
      markupType: cachedSelectedOption.markupType,
      outputType: cachedSelectedOption.outputType,
    }

    return markup
  }

  // Read an argument from the cache and replace references with the value saved before creating a markup argument
  public unwrapArgument(arg: CacheRef): MarkupArgument {
    const cachedArgument = (this.readCache(arg) as unknown) as (CachedArgument)

    switch (cachedArgument.markupType) {
      case MarkupType.Input:
        return {
          hierarchicalType: cachedArgument.hierarchicalType,
          id: arg.id,
          label: cachedArgument.label,
          markupType: cachedArgument.markupType,
          value: cachedArgument.value,
        } as MarkupInput
      case MarkupType.Select:
        return {
          hierarchicalType: cachedArgument.hierarchicalType,
          id: arg.id,
          label: cachedArgument.label,
          markupType: cachedArgument.markupType,
          options: cachedArgument.options,
          outputType: cachedArgument.outputType,
          scriptId: cachedArgument.scriptId,
          selected: this.unwrapSelectedOption(cachedArgument.selected),
        } as MarkupSelect
    }
  }

  /**
   * Wrapper methods to interact with the cache
   */

  // Store all the script operators in the script cache
  public saveScriptCache(script: CachedMarkupScript): ScriptCacheRef {
    return this.scriptCache.insert(script.map(x => x.id))
  }

  // Get the script save in the scripts cache
  public readScriptCache(id: number): Array<number> {
    return this.scriptCache.get(id)
  }

  public updateScriptCache(id: number, script: Array<number>) {
    return this.scriptCache.set(id, script)
  }

  // Insert a new item in the cache in the given id
  public updateCache(id: number, item: CachedMarkupSelectedOption | CachedArgument) {
    return this.cache.set(id, item)
  }  

  // Store a new item in the cache
  public writeCache(result: CachedMarkupSelectedOption | CachedArgument) {
    return this.cache.insert(result)
  }

  // Get the cache item of the given reference
  public readCache(ref: CacheRef): CachedMarkupSelectedOption | MarkupInput | CachedMarkupSelect | MarkupSelect {
    return this.cache.get(ref.id)
  }

  /**
   * Utility functions
   */

  // TOD0: Move this methods out of the class

  // Find the output type of an operator code
  public findOutputType(code: OperatorCode): OutputType | Array<OutputType> {
    const entry: TypeSystemEntry = Object.entries(typeSystem).find(entry => {
      return Object.values(entry[1]).find(x => x[0] === code)
    }) as TypeSystemEntry
    const operatorEntry: [OperatorCode, OutputType[]] = Object.values(entry[1]).find(
      x => x[0] === code
    ) as [OperatorCode, OutputType[]]
    const outputType: Array<OutputType> = operatorEntry[1] as Array<OutputType>
    return outputType.length > 1 ? outputType : outputType[0]
  }

  // Get the mir operator information from the operator code
  public getMirOperatorInfo(
    operator: MirOperator
  ): { code: OperatorCode; args: Array<MirArgument> | null } {
    return Array.isArray(operator)
      ? {
          code: operator[0] as OperatorCode,
          args: operator.slice(1) as Array<MirArgument>,
        }
      : {
          code: operator as OperatorCode,
          args: null,
        }
  }

  // Generate a list of markup options with the given  operator information
  public generateMarkupOptions(
    operatorInfo: OperatorInfo,
    _code: OperatorCode,
    _args: Array<MirArgument> | null
  ): Array<MarkupOption> {
    const markupOptions: Array<MarkupOption> = Object.entries(typeSystem[operatorInfo.type]).map(
      (x: TypeSystemValue) => {
        return {
          hierarchicalType: MarkupHierarchicalType.OperatorOption,
          label: x[0],
          markupType: MarkupType.Option,
          // TODO: Add support for Pseudotypes
          outputType: x[1][1].length > 1 ? x[1][1] : x[1][1][0],
        }
      }
    )

    return markupOptions
  }

  // Create a markup selected reducer argument
  public generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption {
    const selectedArgument: MarkupSelectedOption = {
      arguments: [],
      label: Reducer[reducer],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
    return selectedArgument
  }
}

// Generate a list of markup filter argument options
function generateFilterArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Filter).map(name => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      // TODO: Add support for pseudotypes
      outputType: OutputType.Bytes,
    }
  })
  return markupOptions
}

// Generate a list of markup reducer argument options
function generateReducerArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Reducer).map(name => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
  })
  return markupOptions
}

// Get a mir argument from argument information
function getDefaultMirArgument(argumentInfo: ArgumentInfo): MirArgument {
  const argumentType = argumentInfo.type
  if (argumentType === MirArgumentKind.Boolean) {
    return true
  } else if (argumentType === MirArgumentKind.Integer || argumentType === MirArgumentKind.Bytes) {
    return 0
  } else if (argumentType === MirArgumentKind.Filter) {
    return [0x00, 0]
  } else if (argumentType === MirArgumentKind.Reducer) {
    return 0x00
  } else if (argumentType === MirArgumentKind.Float) {
    return 0.0
  } else {
    return ''
  }
}
