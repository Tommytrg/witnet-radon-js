import {
  TypeSystem,
  Type,
  BooleanOperatorName,
  OperatorCode,
  OutputType,
  IntegerOperatorName,
  FloatOperatorName,
  StringOperatorName,
  ArrayOperatorName,
  MapOperatorName,
  BytesOperatorName,
  ResultOperatorName,
  OperatorInfos,
  MirArgumentKind,
  CacheRef,
} from './types'
import { dummyHash } from './utils'

export const typeSystem: TypeSystem = {
  [Type.Boolean]: {
    [BooleanOperatorName.AsString]: [OperatorCode.BooleanAsString, [OutputType.String]],
    [BooleanOperatorName.Match]: [OperatorCode.BooleanMatch, [OutputType.Argument]],
    [BooleanOperatorName.Negate]: [OperatorCode.BooleanNegate, [OutputType.Boolean]],
  },
  [Type.Integer]: {
    [IntegerOperatorName.Absolute]: [OperatorCode.IntegerAbsolute, [OutputType.Integer]],
    [IntegerOperatorName.AsBytes]: [OperatorCode.IntegerAsBytes, [OutputType.Bytes]],
    [IntegerOperatorName.AsFloat]: [OperatorCode.IntegerAsFloat, [OutputType.Float]],
    [IntegerOperatorName.AsString]: [OperatorCode.IntegerAsString, [OutputType.String]],
    [IntegerOperatorName.GreaterThan]: [OperatorCode.IntegerGreaterThan, [OutputType.Boolean]],
    [IntegerOperatorName.LessThan]: [OperatorCode.IntegerLessThan, [OutputType.Boolean]],
    [IntegerOperatorName.Match]: [OperatorCode.IntegerMatch, [OutputType.Argument]],
    [IntegerOperatorName.Modulo]: [OperatorCode.IntegerModulo, [OutputType.Integer]],
    [IntegerOperatorName.Multiply]: [OperatorCode.IntegerMultiply, [OutputType.Integer]],
    [IntegerOperatorName.Negate]: [OperatorCode.IntegerNegate, [OutputType.Integer]],
    [IntegerOperatorName.Power]: [OperatorCode.IntegerPower, [OutputType.Integer]],
    [IntegerOperatorName.Reciprocal]: [OperatorCode.IntegerReciprocal, [OutputType.Float]],
    [IntegerOperatorName.Sum]: [OperatorCode.IntegerSum, [OutputType.Integer]],
  },
  [Type.Float]: {
    [FloatOperatorName.Absolute]: [OperatorCode.FloatAbsolute, [OutputType.Integer]],
    [FloatOperatorName.AsBytes]: [OperatorCode.FloatAsBytes, [OutputType.Bytes]],
    [FloatOperatorName.AsString]: [OperatorCode.FloatAsString, [OutputType.String]],
    [FloatOperatorName.Ceiling]: [OperatorCode.FloatCeiling, [OutputType.Integer]],
    [FloatOperatorName.GreaterThan]: [OperatorCode.FloatGraterThan, [OutputType.Boolean]],
    [FloatOperatorName.Floor]: [OperatorCode.FloatFloor, [OutputType.Integer]],
    [FloatOperatorName.LessThan]: [OperatorCode.FloatLessThan, [OutputType.Boolean]],
    [FloatOperatorName.Modulo]: [OperatorCode.FloatModulo, [OutputType.Float]],
    [FloatOperatorName.Multiply]: [OperatorCode.FloatMultiply, [OutputType.Float]],
    [FloatOperatorName.Negate]: [OperatorCode.FloatNegate, [OutputType.Float]],
    [FloatOperatorName.Power]: [OperatorCode.FloatPower, [OutputType.Float]],
    [FloatOperatorName.Reciprocal]: [OperatorCode.FloatReciprocal, [OutputType.Float]],
    [FloatOperatorName.Round]: [OperatorCode.FloatRound, [OutputType.Integer]],
    [FloatOperatorName.Sum]: [OperatorCode.Floatsum, [OutputType.Float]],
    [FloatOperatorName.Truncate]: [OperatorCode.FloatTruncate, [OutputType.Integer]],
  },

  [Type.String]: {
    [StringOperatorName.AsBytes]: [OperatorCode.StringAsBytes, [OutputType.Bytes]],
    [StringOperatorName.AsFloat]: [OperatorCode.StringAsFloat, [OutputType.Float]],
    [StringOperatorName.AsInteger]: [OperatorCode.StringAsInteger, [OutputType.Integer]],
    [StringOperatorName.Length]: [OperatorCode.StringLength, [OutputType.Integer]],
    [StringOperatorName.Match]: [OperatorCode.StringMatch, [OutputType.Argument]],
    [StringOperatorName.ParseJson]: [OperatorCode.StringParseJson, [OutputType.Bytes]],
    [StringOperatorName.ParseXml]: [OperatorCode.StringParseXML, [OutputType.Map]],
    [StringOperatorName.AsBoolean]: [OperatorCode.StringAsBoolean, [OutputType.Boolean]],
    [StringOperatorName.ToLowerCase]: [OperatorCode.StringToLowerCase, [OutputType.String]],
    [StringOperatorName.ToUpperCase]: [OperatorCode.StringToUpperCase, [OutputType.String]],
  },

  [Type.Array]: {
    [ArrayOperatorName.AsBytes]: [OperatorCode.ArrayAsBytes, [OutputType.Bytes]],
    [ArrayOperatorName.Count]: [OperatorCode.ArrayCount, [OutputType.Integer]],
    [ArrayOperatorName.Every]: [OperatorCode.ArrayEvery, [OutputType.Boolean]],
    [ArrayOperatorName.Filter]: [OperatorCode.ArrayFilter, [OutputType.Inner]],
    [ArrayOperatorName.Flatten]: [OperatorCode.ArrayFlatten, [OutputType.Passthrough]],
    [ArrayOperatorName.Get]: [OperatorCode.ArrayGet, [OutputType.Inner]],
    [ArrayOperatorName.Map]: [OperatorCode.ArrayMap, [OutputType.Argument]],
    [ArrayOperatorName.Reduce]: [OperatorCode.ArrayReduce, [OutputType.Inner]],
    [ArrayOperatorName.Some]: [OperatorCode.ArraySome, [OutputType.Boolean]],
    [ArrayOperatorName.Sort]: [OperatorCode.ArraySort, [OutputType.Inner]],
    [ArrayOperatorName.Take]: [OperatorCode.ArrayTake, [OutputType.Inner]],
  },
  [Type.Map]: {
    [MapOperatorName.Entries]: [OperatorCode.MapEntries, [OutputType.Bytes]],
    [MapOperatorName.Get]: [OperatorCode.MapGet, [OutputType.Inner]],
    [MapOperatorName.Keys]: [OperatorCode.MapKeys, [OutputType.String]],
    [MapOperatorName.Values]: [OperatorCode.MapValues, [OutputType.Inner]],
  },
  [Type.Bytes]: {
    [BytesOperatorName.AsArray]: [OperatorCode.BytesAsArray, [OutputType.Bytes]],
    [BytesOperatorName.AsBoolean]: [OperatorCode.BytesAsBoolean, [OutputType.Boolean]],
    [BytesOperatorName.AsFloat]: [OperatorCode.BytesAsFloat, [OutputType.Float]],
    [BytesOperatorName.AsInteger]: [OperatorCode.BytesAsInteger, [OutputType.Float]],
    [BytesOperatorName.AsMap]: [OperatorCode.BytesAsMap, [OutputType.Map, OutputType.Bytes]],
    [BytesOperatorName.AsString]: [OperatorCode.BytesAsString, [OutputType.String]],
    [BytesOperatorName.Hash]: [OperatorCode.BytesHash, [OutputType.Bytes]],
  },
  [Type.Result]: {
    [ResultOperatorName.Get]: [OperatorCode.ResultGet, [OutputType.Inner]],
    [ResultOperatorName.GetOr]: [OperatorCode.ResultGetOr, [OutputType.Inner]],
    [ResultOperatorName.IsOk]: [OperatorCode.ResultIsOk, [OutputType.Boolean]],
  },
}

export const operatorInfos: OperatorInfos = {
  [16]: {
    type: Type.Array,
    name: 'count',
    arguments: [],
  },
  [17]: {
    type: Type.Array,
    name: 'filter',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
  },
  [18]: {
    type: Type.Array,
    name: 'flatten',
    arguments: [
      {
        name: 'depth',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [19]: {
    type: Type.Array,
    name: 'get_array',
    outputType: Type.Array,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [20]: {
    type: Type.Array,
    name: 'get_boolean',
    outputType: Type.Boolean,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [21]: {
    type: Type.Array,
    name: 'get_bytes',
    outputType: Type.Bytes,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [22]: {
    type: Type.Array,
    name: 'get_integer',
    outputType: Type.Integer,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [23]: {
    type: Type.Array,
    name: 'get_float',
    outputType: Type.Boolean,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [24]: {
    type: Type.Array,
    name: 'get_map',
    outputType: Type.Map,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [25]: {
    type: Type.Array,
    name: 'get_result',
    outputType: Type.Result,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [26]: {
    type: Type.Array,
    name: 'get_string',
    outputType: Type.String,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [27]: {
    type: Type.Array,
    name: 'map',
    outputType: OutputType.SubscriptOutput,
    arguments: [
      {
        name: 'operator',
        optional: false,
        type: MirArgumentKind.Mapper,
      },
    ],
  },
  [28]: {
    type: Type.Array,
    name: 'reduce',
    outputType: OutputType.Inner,
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Reducer,
      },
    ],
  },
  [29]: {
    type: Type.Array,
    name: 'some',
    outputType: OutputType.Boolean,
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
  },
  [30]: {
    type: Type.Array,
    name: 'sort',
    outputType: OutputType.Same,
    arguments: [
      {
        name: 'mapFunction',
        optional: false,
        type: MirArgumentKind.Mapper,
      },
      {
        name: 'ascending',
        optional: false,
        type: MirArgumentKind.Boolean,
      },
    ],
  },
  [31]: {
    type: Type.Array,
    name: 'take',
    outputType: OutputType.Same,
    arguments: [
      {
        name: 'min',
        optional: true,
        type: MirArgumentKind.Integer,
      },
      {
        name: 'max',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [32]: {
    type: Type.Boolean,
    name: 'match',
    arguments: [
      {
        name: 'categories',
        optional: false,
        type: MirArgumentKind.Map,
      },
      {
        name: 'default',
        optional: false,
        type: MirArgumentKind.Inner,
      },
    ],
  },
  [33]: {
    type: Type.Boolean,
    name: 'negate',
    arguments: [],
  },
  [48]: {
    type: Type.Bytes,
    name: 'asString',
    arguments: [],
  },
  [49]: {
    type: Type.Bytes,
    name: 'hash',
    arguments: [],
  },
  [64]: {
    type: Type.Integer,
    name: 'absolute',
    arguments: [],
  },
  [65]: {
    type: Type.Integer,
    name: 'asFloat',
    arguments: [],
  },
  [66]: {
    type: Type.Integer,
    name: 'asString',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [67]: {
    type: Type.Integer,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [68]: {
    type: Type.Integer,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [69]: {
    type: Type.Integer,
    name: 'match',
    arguments: [],
  },
  [70]: {
    type: Type.Integer,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [71]: {
    type: Type.Integer,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [72]: {
    type: Type.Integer,
    name: 'negate',
    arguments: [],
  },
  [73]: {
    type: Type.Integer,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [74]: {
    type: Type.Integer,
    name: 'reciprocal',
    arguments: [],
  },
  [75]: {
    type: Type.Integer,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [80]: {
    type: Type.Float,
    name: 'absolute',
    arguments: [],
  },
  [81]: {
    type: Type.Float,
    name: 'asString',
    arguments: [
      {
        name: 'decimals',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [82]: {
    type: Type.Float,
    name: 'ceiling',
    arguments: [],
  },
  [83]: {
    type: Type.Float,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [84]: {
    type: Type.Float,
    name: 'floor',
    arguments: [],
  },
  [85]: {
    type: Type.Float,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [86]: {
    type: Type.Float,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [87]: {
    type: Type.Float,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [88]: {
    type: Type.Float,
    name: 'negate',
    arguments: [],
  },
  [89]: {
    type: Type.Float,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [90]: {
    type: Type.Float,
    name: 'reciprocal',
    arguments: [],
  },
  [91]: {
    type: Type.Float,
    name: 'round',
    arguments: [],
  },
  [92]: {
    type: Type.Float,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [93]: {
    type: Type.Float,
    name: 'truncate',
    arguments: [],
  },
  [96]: {
    type: Type.Map,
    name: 'entries',
    arguments: [],
  },
  [97]: {
    type: Type.Map,
    name: 'get_array',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [98]: {
    type: Type.Map,
    name: 'get_boolean',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [99]: {
    type: Type.Map,
    name: 'get_bytes',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [100]: {
    type: Type.Map,
    name: 'get_integer',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [101]: {
    type: Type.Map,
    name: 'get_float',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [102]: {
    type: Type.Map,
    name: 'get_map',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [103]: {
    type: Type.Map,
    name: 'get_string',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [104]: {
    type: Type.Map,
    name: 'keys',
    arguments: [],
  },
  [105]: {
    type: Type.Map,
    name: 'values_array',
    arguments: [],
  },
  [106]: {
    type: Type.Map,
    name: 'values_boolean',
    arguments: [],
  },
  [107]: {
    type: Type.Map,
    name: 'values_bytes',
    arguments: [],
  },
  [108]: {
    type: Type.Map,
    name: 'values_integer',
    arguments: [],
  },
  [109]: {
    type: Type.Map,
    name: 'values_float',
    arguments: [],
  },
  [110]: {
    type: Type.Map,
    name: 'values_map',
    arguments: [],
  },
  [111]: {
    type: Type.Map,
    name: 'values_string',
    arguments: [],
  },


  [112]: {
    type: Type.Result,
    name: 'get',
    arguments: [],
  },
  [113]: {
    type: Type.Result,
    name: 'getOr',
    arguments: [
      {
        name: 'default',
        optional: false,
        type: MirArgumentKind.Inner,
      },
    ],
  },
  [114]: {
    type: Type.Result,
    name: 'isOk',
    arguments: [],
  },





  [0x47]: {
    type: Type.String,
    name: 'asBoolean',
    arguments: [],
  },
  [0x40]: {
    type: Type.String,
    name: 'asBytes',
    arguments: [],
  },
  [0x41]: {
    type: Type.String,
    name: 'asFloat',
    arguments: [],
  },
  [0x42]: {
    type: Type.String,
    name: 'asInteger',
    arguments: [],
  },
  [0x43]: {
    type: Type.String,
    name: 'length',
    arguments: [],
  },
  [0x44]: {
    type: Type.String,
    name: 'match',
    arguments: [],
 
  [0x45]: {
    type: Type.String,
    name: 'parseJson_array',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson_boolean',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson_integer',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson_float',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson_map',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson_string',
    arguments: [],
  },
  [0x46]: {
    type: Type.String,
    name: 'parseXml',
    arguments: [],
  },
  [0x48]: {
    type: Type.String,
    name: 'toLowerCase',
    arguments: [],
  },
  [0x49]: {
    type: Type.String,
    name: 'toUpperCase',
    arguments: [],
  },
}

export class Cache<T> {
  private cache: {
    [key: string]: T
  }

  constructor() {
    this.cache = {}
  }

  get(cacheId: number): T {
    return this.cache[cacheId]
  }

  set(item: T): CacheRef {
    const id = dummyHash(JSON.stringify(item))
    this.cache[id] = item
    return { id }
  }
}
