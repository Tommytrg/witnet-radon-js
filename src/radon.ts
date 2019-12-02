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
} from './types'

import { Cache, operatorInfos, typeSystem, markupOptions } from './structures'
import { markup2mir } from './markup2mir'

const filterArgumentOptions = generateFilterArgumentOptions()
const reducerArgumentOptions = generateReducerArgumentOptions()

export class Radon {
  private cache: Cache<CachedMarkupSelectedOption | Markup | CachedArgument | MarkupSelectedOption>
  private lasType: OutputType = OutputType.Bytes
  private cachedMarkup: CachedMarkup = {
    description: '',
    name: '',
    radRequest: {
      notBefore: 0,
      retrieve: [
        {
          kind: '',
          script: [],
          url: '',
        },
      ],
      aggregate: [],
      tally: [],
    },
  }

  constructor(mir?: Mir) {
    this.cache = new Cache()
    this.cachedMarkup = mir ? this.mir2markup(mir) : this.cachedMarkup
  }

  private wrapResultInCache(
    result:
      | Markup
      | CachedMarkupSelect
      | CachedMarkupSelectedOption
      | CachedArgument
      | MarkupSelectedOption
  ) {
    return this.cache.insert(result)
  }

  private unwrapResultFromCache(ref: CacheRef) {
    return this.cache.get(ref.id)
  }

  public mir2markup(mir: Mir): CachedMarkup {
    const retrieveScript = mir.radRequest.retrieve.map((source: MirSource) => {
      let generatedMarkupScript: CachedMarkupScript = this.generateMarkupScript(source.script)
      return {
        kind: source.kind,
        url: source.url,
        script: generatedMarkupScript,
      } as CachedMarkupSource
    })

    const aggregateScript: CachedMarkupScript = this.generateMarkupScript(mir.radRequest.aggregate)
    const tallyScript: CachedMarkupScript = this.generateMarkupScript(mir.radRequest.tally)
    const radRequest: CachedMarkupRequest = {
      notBefore: mir.radRequest.notBefore,
      retrieve: retrieveScript,
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

  public getMir() {
    return markup2mir(this.getMarkup())
  }

  public getMarkup(): Markup {
    const cachedRadRequest = this.cachedMarkup.radRequest
    const radRequest: MarkupRequest = {
      notBefore: cachedRadRequest.notBefore,
      retrieve: cachedRadRequest.retrieve.map((source: CachedMarkupSource) => {
        return this.unwrapSource(source)
      }),
      aggregate: this.unwrapScript(cachedRadRequest.aggregate),
      tally: this.unwrapScript(cachedRadRequest.tally),
    }

    return {
      description: this.cachedMarkup.description,
      name: this.cachedMarkup.name,
      radRequest,
    }
  }

  private generateMarkupScript(script: MirScript): CachedMarkupScript {
    const markupScript: CachedMarkupScript = script.map((operator: MirOperator) => {
      return this.wrapResultInCache(this.generateMarkupOperator(operator))
    })

    return markupScript
  }

  private generateMarkupOperator(operator: MirOperator): CachedMarkupOperator {
    const { code, args } = getMirOperatorInfo(operator)
    const operatorInfo: OperatorInfo = operatorInfos[code]
    const outputType = findOutputType(code)
    const options = generateMarkupOptions(this.lasType)
    const selected = this.generateSelectedOption(operatorInfo, code, args)

    const markupOperator: CachedMarkupSelect = {
      id: 0,
      scriptId: 0,
      markupType: MarkupType.Select,
      hierarchicalType: MarkupHierarchicalType.Operator,
      outputType,
      selected: this.wrapResultInCache(selected),
      options,
    }

    this.lasType = selected.outputType

    return markupOperator
  }

  private generateSelectedOption(
    operatorInfo: OperatorInfo,
    code: OperatorCode,
    args: Array<MirArgument> | null
  ): CachedMarkupSelectedOption {
    const outputType = findOutputType(code)
    const markupSelectedOption: CachedMarkupSelectedOption = {
      arguments: args && args.length ? this.generateOperatorArguments(operatorInfo, args) : [],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      label: operatorInfo.name,
      markupType: MarkupType.Option,
      outputType: outputType,
    }

    return markupSelectedOption
  }

  private generateOperatorArguments(
    operatorInfo: OperatorInfo,
    args: Array<MirArgument>
  ): Array<CacheRef> {
    const operatorArguments: Array<CacheRef> = args.map((argument: MirArgument, index: number) => {
      let argumentInfo = operatorInfo.arguments[index]
      switch (argumentInfo.type) {
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
          return this.wrapResultInCache(
            this.generateInputArgument(argumentInfo.name, argument as string | number | boolean)
          )
        case MirArgumentKind.Filter:
          return this.wrapResultInCache(this.generateFilterArgument(argument as FilterArgument))
        case MirArgumentKind.Reducer:
          return this.wrapResultInCache(
            this.generateReducerArgument(argumentInfo.name, argument as Reducer)
          )
      }
    })
    return operatorArguments
  }

  private generateInputArgument(label: string, value: string | number | boolean): MarkupInput {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      label,
      markupType: MarkupType.Input,
      value,
    } as MarkupInput
  }

  private generateFilterArgument(filter: FilterArgument): CachedMarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      markupType: MarkupType.Select,
      options: filterArgumentOptions,
      scriptId: 0,
      selected: this.wrapResultInCache(this.generateSelectedFilterArgument(filter)),
    } as CachedMarkupSelect
  }

  private generateReducerArgument(label: string, reducer: Reducer): CachedMarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: 0,
      markupType: MarkupType.Select,
      options: reducerArgumentOptions,
      outputType: OutputType.Bytes,
      scriptId: 0,
      label,
      selected: this.wrapResultInCache(this.generateSelectedReducerArgument(reducer)),
    } as CachedMarkupSelect
  }

  private generateSelectedFilterArgument(
    filterArgument: FilterArgument
  ): CachedMarkupSelectedOption {
    const filter: Filter = filterArgument[0]
    const argument = filterArgument[1]
    const selectedArgument: CachedMarkupSelectedOption = {
      arguments: [this.wrapResultInCache(this.generateInputArgument('by', argument))],
      label: Filter[filter],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
    return selectedArgument
  }

  private generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption {
    const selectedArgument: MarkupSelectedOption = {
      arguments: [],
      label: Reducer[reducer],
      hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
    return selectedArgument
  }

  private unwrapSource(source: CachedMarkupSource): MarkupSource {
    const markupSource: MarkupSource = {
      kind: source.kind,
      url: source.url,
      script: this.unwrapScript(source.script),
    }

    return markupSource
  }

  private unwrapScript(script: Array<CacheRef>): MarkupScript {
    const markupScript: MarkupScript = script.map(operatorRef => {
      const cachedOperator: CachedMarkupOperator = (this.unwrapResultFromCache(
        operatorRef
      ) as unknown) as CachedMarkupOperator
      const operator: MarkupOperator = this.unwrapOperator(cachedOperator, operatorRef.id)

      return operator
    })

    return markupScript
  }

  private unwrapOperator(operator: CachedMarkupOperator, id: number): MarkupOperator {
    const selected = this.unwrapSelectedOption(operator.selected)
    const markup: MarkupOperator = {
      hierarchicalType: operator.hierarchicalType,
      id: id,
      label: selected.label,
      markupType: operator.markupType,
      options: operator.options,
      outputType: operator.outputType,
      scriptId: operator.scriptId,
      selected,
    }
    return markup
  }
  private unwrapSelectedOption(selectedOption: CacheRef): MarkupSelectedOption {
    const cachedSelectedOption: CachedMarkupSelectedOption = this.unwrapResultFromCache(
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

  private unwrapArgument(arg: CacheRef): MarkupArgument {
    const cachedArgument = (this.unwrapResultFromCache(arg) as unknown) as (CachedArgument)

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
        const selected = this.unwrapSelectedOption(cachedArgument.selected)
        return {
          hierarchicalType: cachedArgument.hierarchicalType,
          id: arg.id,
          label: selected.label,
          markupType: cachedArgument.markupType,
          options: cachedArgument.options,
          outputType: cachedArgument.outputType,
          scriptId: cachedArgument.scriptId,
          selected: selected,
        } as MarkupSelect
    }
  }
}

function findOutputType(code: OperatorCode): OutputType {
  const entry: TypeSystemEntry = Object.entries(typeSystem).find(entry => {
    return Object.values(entry[1]).find(x => x[0] === code)
  }) as TypeSystemEntry
  const operatorEntry: [OperatorCode, OutputType] = Object.values(entry[1]).find(
    x => x[0] === code
  ) as [OperatorCode, OutputType]
  const outputType: OutputType = operatorEntry[1] as OutputType
  return outputType
}

function getMirOperatorInfo(
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

function generateMarkupOptions(type: OutputType): Array<MarkupOption> {
  return (markupOptions[type] ? markupOptions[type] : markupOptions['all']) as Array<MarkupOption>
}

// TODO: Call this function just at the beginning
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

// TODO: Call this function just at the beginning
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
