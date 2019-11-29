import {
  findOperatorCode,
  generateMirOperator,
  generateMirArgument,
  getFilterCode,
  getReducerCode,
  generateMirScript,
  generateMirSources,
} from '../src/markup2mir'
import { getEnumNames, getEnumValues } from '../src/utils'
import {
  ArrayOperatorName,
  StringOperatorName,
  BooleanOperatorName,
  IntegerOperatorName,
  FloatOperatorName,
  MapOperatorName,
  BytesOperatorName,
  MarkupHierarchicalType,
  MirArgumentKind,
  Filter,
  MarkupInput,
  MarkupType,
  Reducer,
  OutputType,
  MarkupSelect,
  MarkupOption,
  MarkupScript,
} from '../src/types'

const REDUCERS = getEnumNames(Reducer)
const FILTERS = getEnumNames(Filter)

describe.skip('mir2markup', () => {
  describe('findOperatorCode should return correct code for each type', () => {
    it('boolean', () => {
      expect(
        findOperatorCode('negate' as BooleanOperatorName, getEnumValues(BooleanOperatorName))
      ).toBe(0x11)
    })
    it('integer', () => {
      expect(
        findOperatorCode('absolute' as IntegerOperatorName, getEnumValues(IntegerOperatorName))
      ).toBe(0x20)
    })
    it('float', () => {
      expect(
        findOperatorCode('ceiling' as FloatOperatorName, getEnumValues(FloatOperatorName))
      ).toBe(0x33)
    })
    it('string', () => {
      expect(
        findOperatorCode('asBytes' as StringOperatorName, getEnumValues(StringOperatorName))
      ).toBe(0x40)
    })
    it('array', () => {
      expect(findOperatorCode('count' as ArrayOperatorName, getEnumValues(ArrayOperatorName))).toBe(
        0x51
      )
    })
    it('map', () => {
      expect(findOperatorCode('entries' as MapOperatorName, getEnumValues(MapOperatorName))).toBe(
        0x60
      )
    })
    it('bytes', () => {
      expect(
        findOperatorCode('asArray' as BytesOperatorName, getEnumValues(BytesOperatorName))
      ).toBe(0x70)
    })
  })

  describe('generateMirOperator returns the correct MIR', () => {
    it('without arguments', () => {
      const operatorCode = 0x11
      expect(generateMirOperator(operatorCode, null)).toBe(operatorCode)
    })
    it('with 1 argument', () => {
      const operatorCode = 0x11
      const args = [10]
      expect(generateMirOperator(operatorCode, args)).toStrictEqual([operatorCode, 10])
    })
    it('with 2 argument', () => {
      const operatorCode = 0x5a
      const args = [10, 20]
      expect(generateMirOperator(operatorCode, args)).toStrictEqual([operatorCode, 10, 20])
    })
  })

  it('getFilterCode returns the correct code', () => {
    expect(getFilterCode(('greaterThan' as unknown) as Filter)).toBe(0x00)
    expect(getFilterCode(('notBottom' as unknown) as Filter)).toBe(0x87)
  })

  it('getReducerCode returns the correct code', () => {
    expect(getReducerCode(('min' as unknown) as Reducer)).toBe(0x00)
    expect(getReducerCode(('max' as unknown) as Reducer)).toBe(0x01)
  })

  describe('generateMirArgument should return the correct mir', () => {
    it('markupInput argument', () => {
      // operatorCode = 0x61
      const value = 'bpi'
      const markupInput: MarkupInput = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        label: 'key',
        markupType: 'input' as MarkupType.Input,
        value: value,
      }
      const argumentInfo = {
        name: 'key',
        optional: false,
        type: 12 as MirArgumentKind.String,
      }
      expect(generateMirArgument(markupInput, argumentInfo)).toBe(value)
    })

    it('markupSelect reducer', () => {
      const result: MarkupSelect = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        scriptId: 0,
        label: 'function',
        markupType: 'select' as MarkupType.Select,
        options: REDUCERS.map(reducer => ({
          arguments: [],
          hierarchicalType: 'operatorOption',
          label: reducer,
          markupType: 'option',
          outputType: 'bytes',
        })) as Array<MarkupOption>,
        outputType: 'integer' as OutputType,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'min',
          markupType: 'option' as MarkupType.Option,
          outputType: 'bytes' as OutputType.Bytes,
        },
      }

      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Reducer,
      }
      const reducerMin = 0x00
      expect(generateMirArgument(result, argumentInfo)).toStrictEqual(reducerMin)
    })
    it('markupSelect filter', () => {
      const options: Array<MarkupOption> = FILTERS.map(filter => ({
        arguments: [],
        hierarchicalType: 'operatorOption',
        label: filter,
        markupType: 'option',
        outputType: 'bytes',
      })) as Array<MarkupOption>
      const result: MarkupSelect = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        scriptId: 0,
        label: 'function',
        markupType: 'select' as MarkupType.Select,
        options: options,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
              id: 0,
              label: 'by',
              markupType: 'input' as MarkupType.Input,
              value: 5,
            },
          ],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'greaterThan',
          markupType: 'option' as MarkupType.Option,
          outputType: 'bytes' as OutputType,
        },
        outputType: 'bytes' as OutputType,
      }

      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      }

      const filter = [0x00, 5]
      expect(generateMirArgument(result, argumentInfo)).toStrictEqual(filter)
    })
  })

  it('generateMirScript should return the correct mir', () => {
    const expected = [69, 116, [97, 'bpi'], 116, [97, 'rate_float'], 114]
    const markupScript: MarkupScript = [
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asBytes',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'length',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseJson',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseXml',
            markupType: 'option',
            outputType: 'map',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toLowerCase',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toUpperCase',
            markupType: 'option',
            outputType: 'string',
          },
        ],
        outputType: 'bytes',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'parseJson',
          markupType: 'option',
          outputType: 'bytes',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'bpi',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'rate_float',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: 'float',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asFloat',
          markupType: 'option',
          outputType: 'float',
        },
      },
    ] as Array<MarkupSelect>

    expect(generateMirScript(markupScript)).toStrictEqual(expected)
  })

  it('generateMirSource should return the correct mir', () => {
    const expected = {
      kind: '',
      script: [69, 116, [97, 'bpi'], 116, [97, 'rate'], 114],
      url: 'url',
    }

    const markupScript: MarkupScript = [
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asBytes',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'length',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseJson',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseXml',
            markupType: 'option',
            outputType: 'map',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toLowerCase',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toUpperCase',
            markupType: 'option',
            outputType: 'string',
          },
        ],
        outputType: 'bytes',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'parseJson',
          markupType: 'option',
          outputType: 'bytes',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'bpi',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'rate',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: 'float',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asFloat',
          markupType: 'option',
          outputType: 'float',
        },
      },
    ] as Array<MarkupSelect>

    const markupSource = {
      kind: '',
      script: markupScript,
      url: 'url',
    }
    expect(generateMirSources([markupSource, markupSource])).toStrictEqual([expected, expected])
  })
})
