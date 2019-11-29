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

export const typeSystem: TypeSystem = {
  [Type.Array]: {
    [ArrayOperatorName.Count]: [OperatorCode.ArrayCount, OutputType.Integer],
    [ArrayOperatorName.Filter]: [OperatorCode.ArrayFilter, OutputType.Array],
    [ArrayOperatorName.Flatten]: [OperatorCode.ArrayFlatten, OutputType.Array],
    [ArrayOperatorName.GetArray]: [OperatorCode.ArrayGetArray, OutputType.Array],
    [ArrayOperatorName.GetBoolean]: [OperatorCode.ArrayGetBoolean, OutputType.Boolean],
    [ArrayOperatorName.GetBytes]: [OperatorCode.ArrayGetBytes, OutputType.Bytes],
    [ArrayOperatorName.GetFloat]: [OperatorCode.ArrayGetFloat, OutputType.Float],
    [ArrayOperatorName.GetInteger]: [OperatorCode.ArrayGetInteger, OutputType.Integer],
    [ArrayOperatorName.GetMap]: [OperatorCode.ArrayGetMap, OutputType.Map],
    [ArrayOperatorName.GetResult]: [OperatorCode.ArrayGetResult, OutputType.Result],
    [ArrayOperatorName.GetString]: [OperatorCode.ArrayGetString, OutputType.String],
    [ArrayOperatorName.Map]: [OperatorCode.ArrayMap, OutputType.ArrayMap],
    [ArrayOperatorName.Reduce]: [OperatorCode.ArrayReduce, OutputType.ReducerOutput],
    [ArrayOperatorName.Some]: [OperatorCode.ArraySome, OutputType.FilterOutput],
    [ArrayOperatorName.Sort]: [OperatorCode.ArraySort, OutputType.Same],
    [ArrayOperatorName.Take]: [OperatorCode.ArrayTake, OutputType.Array],
  },
  [Type.Boolean]: {
    [BooleanOperatorName.Match]: [OperatorCode.BooleanMatch, OutputType.MatchOutput],
    [BooleanOperatorName.Negate]: [OperatorCode.BooleanNegate, OutputType.Boolean],
  },
  [Type.Bytes]: {
    [BytesOperatorName.AsString]: [OperatorCode.BytesAsString, OutputType.String],
    [BytesOperatorName.Hash]: [OperatorCode.BytesHash, OutputType.Bytes],
  },
  [Type.Integer]: {
    [IntegerOperatorName.Absolute]: [OperatorCode.IntegerAbsolute, OutputType.Integer],
    [IntegerOperatorName.AsFloat]: [OperatorCode.IntegerAsFloat, OutputType.Float],
    [IntegerOperatorName.AsString]: [OperatorCode.IntegerAsString, OutputType.String],
    [IntegerOperatorName.GreaterThan]: [OperatorCode.IntegerGreaterThan, OutputType.Boolean],
    [IntegerOperatorName.LessThan]: [OperatorCode.IntegerLessThan, OutputType.Boolean],
    [IntegerOperatorName.Match]: [OperatorCode.IntegerMatch, OutputType.MatchOutput],
    [IntegerOperatorName.Modulo]: [OperatorCode.IntegerModulo, OutputType.Integer],
    [IntegerOperatorName.Multiply]: [OperatorCode.IntegerMultiply, OutputType.Integer],
    [IntegerOperatorName.Negate]: [OperatorCode.IntegerNegate, OutputType.Integer],
    [IntegerOperatorName.Power]: [OperatorCode.IntegerPower, OutputType.Integer],
    [IntegerOperatorName.Reciprocal]: [OperatorCode.IntegerReciprocal, OutputType.Float],
    [IntegerOperatorName.Sum]: [OperatorCode.IntegerSum, OutputType.Integer],
  },
  [Type.Float]: {
    [FloatOperatorName.Absolute]: [OperatorCode.FloatAbsolute, OutputType.Float],
    [FloatOperatorName.AsString]: [OperatorCode.FloatAsString, OutputType.String],
    [FloatOperatorName.Ceiling]: [OperatorCode.FloatCeiling, OutputType.Integer],
    [FloatOperatorName.GreaterThan]: [OperatorCode.FloatGraterThan, OutputType.Boolean],
    [FloatOperatorName.Floor]: [OperatorCode.FloatFloor, OutputType.Integer],
    [FloatOperatorName.LessThan]: [OperatorCode.FloatLessThan, OutputType.Boolean],
    [FloatOperatorName.Modulo]: [OperatorCode.FloatModulo, OutputType.Float],
    [FloatOperatorName.Multiply]: [OperatorCode.FloatMultiply, OutputType.Float],
    [FloatOperatorName.Negate]: [OperatorCode.FloatNegate, OutputType.Float],
    [FloatOperatorName.Power]: [OperatorCode.FloatPower, OutputType.Float],
    [FloatOperatorName.Reciprocal]: [OperatorCode.FloatReciprocal, OutputType.Float],
    [FloatOperatorName.Round]: [OperatorCode.FloatRound, OutputType.Integer],
    [FloatOperatorName.Sum]: [OperatorCode.Floatsum, OutputType.Float],
    [FloatOperatorName.Truncate]: [OperatorCode.FloatTruncate, OutputType.Integer],
  },
  [Type.Map]: {
    [MapOperatorName.Entries]: [OperatorCode.MapEntries, OutputType.Bytes],
    [MapOperatorName.GetArray]: [OperatorCode.MapGetArray, OutputType.Array],
    [MapOperatorName.GetBoolean]: [OperatorCode.MapGetBoolean, OutputType.Boolean],
    [MapOperatorName.GetBytes]: [OperatorCode.MapGetBytes, OutputType.Bytes],
    [MapOperatorName.GetFloat]: [OperatorCode.MapGetFloat, OutputType.Float],
    [MapOperatorName.GetInteger]: [OperatorCode.MapGetInteger, OutputType.Integer],
    [MapOperatorName.GetMap]: [OperatorCode.MapGetMap, OutputType.Map],
    [MapOperatorName.GetString]: [OperatorCode.MapGetString, OutputType.String],
    [MapOperatorName.Keys]: [OperatorCode.MapKeys, OutputType.ArrayString],
    [MapOperatorName.valuesArray]: [OperatorCode.MapValuesArray, OutputType.ArrayArray],
    [MapOperatorName.valuesBoolean]: [OperatorCode.MapValuesBoolean, OutputType.ArrayBoolean],
    [MapOperatorName.valuesBytes]: [OperatorCode.MapValuesBytes, OutputType.ArrayBytes],
    [MapOperatorName.valuesFloat]: [OperatorCode.MapValuesFloat, OutputType.ArrayFloat],
    [MapOperatorName.valuesInteger]: [OperatorCode.MapValuesInteger, OutputType.ArrayInteger],
    [MapOperatorName.valuesMap]: [OperatorCode.MapValuesMap, OutputType.ArrayMap],
    [MapOperatorName.valuesString]: [OperatorCode.MapValuesString, OutputType.ArrayString],
  },
  [Type.String]: {
    [StringOperatorName.AsBoolean]: [OperatorCode.StringAsBoolean, OutputType.Boolean],
    [StringOperatorName.AsBytes]: [OperatorCode.StringAsBytes, OutputType.Bytes],
    [StringOperatorName.AsFloat]: [OperatorCode.StringAsFloat, OutputType.Float],
    [StringOperatorName.AsInteger]: [OperatorCode.StringAsInteger, OutputType.Integer],
    [StringOperatorName.Length]: [OperatorCode.StringLength, OutputType.Integer],
    [StringOperatorName.Match]: [OperatorCode.StringMatch, OutputType.MatchOutput],
    [StringOperatorName.ParseJsonArray]: [OperatorCode.StringParseJsonArray, OutputType.Array],
    [StringOperatorName.ParseJsonBoolean]: [
      OperatorCode.StringParseJsonBoolean,
      OutputType.Boolean,
    ],
    [StringOperatorName.ParseJsonFloat]: [OperatorCode.StringParseJsonFloat, OutputType.Float],
    [StringOperatorName.ParseJsonInteger]: [
      OperatorCode.StringParseJsonInteger,
      OutputType.Integer,
    ],
    [StringOperatorName.ParseJsonMap]: [OperatorCode.StringParseJsonMap, OutputType.Map],
    [StringOperatorName.ParseJsonString]: [OperatorCode.StringParseJsonString, OutputType.String],
    [StringOperatorName.ParseXml]: [OperatorCode.StringParseXML, OutputType.Map],
    [StringOperatorName.ToLowerCase]: [OperatorCode.StringToLowerCase, OutputType.String],
    [StringOperatorName.ToUpperCase]: [OperatorCode.StringToUpperCase, OutputType.String],
  },
  [Type.Result]: {
    [ResultOperatorName.Get]: [OperatorCode.ResultGet, OutputType.Inner],
    [ResultOperatorName.GetOr]: [OperatorCode.ResultGetOr, OutputType.Inner],
    [ResultOperatorName.IsOk]: [OperatorCode.ResultIsOk, OutputType.Boolean],
  },
}

export const operatorInfos: OperatorInfos = {
  [OperatorCode.ArrayCount]: {
    type: Type.Array,
    name: 'count',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.ArrayFilter]: {
    type: Type.Array,
    name: 'filter',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
    outputType: OutputType.Same,
  },
  [OperatorCode.ArrayFlatten]: {
    type: Type.Array,
    name: 'flatten',
    arguments: [
      {
        name: 'depth',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Inner,
  },
  [OperatorCode.ArrayGetArray]: {
    type: Type.Array,
    name: 'get_array',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Array,
  },
  [OperatorCode.ArrayGetBoolean]: {
    type: Type.Boolean,
    name: 'get_boolean',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.ArrayGetBytes]: {
    type: Type.Array,
    name: 'get_bytes',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Bytes,
  },
  [OperatorCode.ArrayGetInteger]: {
    type: Type.Array,
    name: 'get_integer',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.ArrayGetFloat]: {
    type: Type.Array,
    name: 'get_float',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.ArrayGetMap]: {
    type: Type.Array,
    name: 'get_map',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Map,
  },
  [OperatorCode.ArrayGetResult]: {
    type: Type.Array,
    name: 'get_result',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Result,
  },
  [OperatorCode.ArrayGetString]: {
    type: Type.Array,
    name: 'get_string',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.String,
  },
  [OperatorCode.ArrayMap]: {
    type: Type.Array,
    name: 'map',
    arguments: [
      {
        name: 'script',
        optional: false,
        type: MirArgumentKind.Mapper,
      },
    ],
    outputType: OutputType.SubscriptOutput,
  },
  [OperatorCode.ArrayReduce]: {
    type: Type.Array,
    name: 'reduce',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Reducer,
      },
    ],
    outputType: OutputType.Inner,
  },
  [OperatorCode.ArraySome]: {
    type: Type.Array,
    name: 'some',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.ArraySort]: {
    type: Type.Array,
    name: 'sort',
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
    outputType: OutputType.Same,
  },
  [OperatorCode.ArrayTake]: {
    type: Type.Array,
    name: 'take',
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
    outputType: OutputType.Same,
  },
  [OperatorCode.BooleanMatch]: {
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
    outputType: OutputType.MatchOutput,
  },
  [OperatorCode.BooleanNegate]: {
    type: Type.Boolean,
    name: 'negate',
    arguments: [],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.BytesAsString]: {
    type: Type.Bytes,
    name: 'asString',
    arguments: [],
    outputType: OutputType.String,
  },
  [OperatorCode.BytesHash]: {
    type: Type.Bytes,
    name: 'hash',
    arguments: [],
    outputType: OutputType.Bytes,
  },
  [OperatorCode.IntegerAbsolute]: {
    type: Type.Integer,
    name: 'absolute',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.IntegerAsFloat]: {
    type: Type.Integer,
    name: 'asFloat',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.IntegerAsString]: {
    type: Type.Integer,
    name: 'asString',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.String,
  },
  [OperatorCode.IntegerGreaterThan]: {
    type: Type.Integer,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.IntegerLessThan]: {
    type: Type.Integer,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.IntegerMatch]: {
    type: Type.Integer,
    name: 'match',
    arguments: [],
    outputType: OutputType.MatchOutput,
  },
  [OperatorCode.IntegerModulo]: {
    type: Type.Integer,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.IntegerMultiply]: {
    type: Type.Integer,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.IntegerNegate]: {
    type: Type.Integer,
    name: 'negate',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.IntegerPower]: {
    type: Type.Integer,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.IntegerReciprocal]: {
    type: Type.Integer,
    name: 'reciprocal',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.IntegerSum]: {
    type: Type.Integer,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.FloatAbsolute]: {
    type: Type.Float,
    name: 'absolute',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatAsString]: {
    type: Type.Float,
    name: 'asString',
    arguments: [
      {
        name: 'decimals',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.String,
  },
  [OperatorCode.FloatCeiling]: {
    type: Type.Float,
    name: 'ceiling',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.FloatGraterThan]: {
    type: Type.Float,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.FloatFloor]: {
    type: Type.Float,
    name: 'floor',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatLessThan]: {
    type: Type.Float,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.FloatModulo]: {
    type: Type.Float,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatMultiply]: {
    type: Type.Float,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatNegate]: {
    type: Type.Float,
    name: 'negate',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatPower]: {
    type: Type.Float,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatReciprocal]: {
    type: Type.Float,
    name: 'reciprocal',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatRound]: {
    type: Type.Float,
    name: 'round',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.Floatsum]: {
    type: Type.Float,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
    outputType: OutputType.Float,
  },
  [OperatorCode.FloatTruncate]: {
    type: Type.Float,
    name: 'truncate',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.MapEntries]: {
    type: Type.Map,
    name: 'entries',
    arguments: [],
    outputType: OutputType.Array,
  },
  [OperatorCode.MapGetArray]: {
    type: Type.Map,
    name: 'get_array',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Array,
  },
  [OperatorCode.MapGetBoolean]: {
    type: Type.Map,
    name: 'get_boolean',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.MapGetBytes]: {
    type: Type.Map,
    name: 'get_bytes',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Bytes,
  },
  [OperatorCode.MapGetInteger]: {
    type: Type.Map,
    name: 'get_integer',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Integer,
  },
  [OperatorCode.MapGetFloat]: {
    type: Type.Map,
    name: 'get_float',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Float,
  },
  [OperatorCode.MapGetMap]: {
    type: Type.Map,
    name: 'get_map',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.Map,
  },
  [OperatorCode.MapGetString]: {
    type: Type.Map,
    name: 'get_string',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
    outputType: OutputType.String,
  },
  [OperatorCode.MapKeys]: {
    type: Type.Map,
    name: 'keys',
    arguments: [],
    outputType: OutputType.ArrayString,
  },
  [OperatorCode.MapValuesArray]: {
    type: Type.Map,
    name: 'values_array',
    arguments: [],
    outputType: OutputType.ArrayArray,
  },
  [OperatorCode.MapValuesBoolean]: {
    type: Type.Map,
    name: 'values_boolean',
    arguments: [],
    outputType: OutputType.ArrayBoolean,
  },
  [OperatorCode.MapValuesBytes]: {
    type: Type.Map,
    name: 'values_bytes',
    arguments: [],
    outputType: OutputType.ArrayBytes,
  },
  [OperatorCode.MapValuesInteger]: {
    type: Type.Map,
    name: 'values_integer',
    arguments: [],
    outputType: OutputType.ArrayInteger,
  },
  [OperatorCode.MapValuesFloat]: {
    type: Type.Map,
    name: 'values_float',
    arguments: [],
    outputType: OutputType.ArrayFloat,
  },
  [OperatorCode.MapValuesMap]: {
    type: Type.Map,
    name: 'values_map',
    arguments: [],
    outputType: OutputType.ArrayMap,
  },
  [OperatorCode.MapValuesString]: {
    type: Type.Map,
    name: 'values_string',
    arguments: [],
    outputType: OutputType.ArrayString,
  },
  [OperatorCode.ResultGet]: {
    type: Type.Result,
    name: 'get',
    arguments: [],
    outputType: OutputType.Inner,
  },
  [OperatorCode.ResultGetOr]: {
    type: Type.Result,
    name: 'getOr',
    arguments: [
      {
        name: 'default',
        optional: false,
        type: MirArgumentKind.Inner,
      },
    ],
    outputType: OutputType.Inner,
  },
  [OperatorCode.ResultIsOk]: {
    type: Type.Result,
    name: 'isOk',
    arguments: [],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.StringAsBoolean]: {
    type: Type.String,
    name: 'asBoolean',
    arguments: [],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.StringAsBytes]: {
    type: Type.String,
    name: 'asBytes',
    arguments: [],
    outputType: OutputType.Bytes,
  },
  [OperatorCode.StringAsFloat]: {
    type: Type.String,
    name: 'asFloat',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.StringAsInteger]: {
    type: Type.String,
    name: 'asInteger',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.StringLength]: {
    type: Type.String,
    name: 'length',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.StringMatch]: {
    type: Type.String,
    name: 'match',
    arguments: [],
    outputType: OutputType.MatchOutput,
  },
  [OperatorCode.StringParseJsonArray]: {
    type: Type.String,
    name: 'parseJson_array',
    arguments: [],
    outputType: OutputType.Array,
  },
  [OperatorCode.StringParseJsonBoolean]: {
    type: Type.String,
    name: 'parseJson_boolean',
    arguments: [],
    outputType: OutputType.Boolean,
  },
  [OperatorCode.StringParseJsonInteger]: {
    type: Type.String,
    name: 'parseJson_integer',
    arguments: [],
    outputType: OutputType.Integer,
  },
  [OperatorCode.StringParseJsonFloat]: {
    type: Type.String,
    name: 'parseJson_float',
    arguments: [],
    outputType: OutputType.Float,
  },
  [OperatorCode.StringParseJsonMap]: {
    type: Type.String,
    name: 'parseJson_map',
    arguments: [],
    outputType: OutputType.Map,
  },
  [OperatorCode.StringParseJsonString]: {
    type: Type.String,
    name: 'parseJson_string',
    arguments: [],
    outputType: OutputType.String,
  },
  [OperatorCode.StringParseXML]: {
    type: Type.String,
    name: 'parseXml',
    arguments: [],
    outputType: OutputType.Map,
  },
  [OperatorCode.StringToLowerCase]: {
    type: Type.String,
    name: 'toLowerCase',
    arguments: [],
    outputType: OutputType.String,
  },
  [OperatorCode.StringToUpperCase]: {
    type: Type.String,
    name: 'toUpperCase',
    arguments: [],
    outputType: OutputType.String,
  },
}

export class Cache<T> {
  private counter: number = 0

  private cache: {
    [key: number]: T
  }

  constructor() {
    this.cache = {}
  }

  getLastIndex() {
    return this.counter + 1
  }

  get(cacheId: number): T {
    return this.cache[cacheId]
  }

  insert(item: T): CacheRef {
    this.cache[++this.counter] = item
    return { id: this.counter }
  }

  set(id: number, item: T) {
    this.cache[id] = item
  }
}

function generateOption (label: OperatorCode, outputType: OutputType) {
  return {
    hierarchicalType: 'operatorOption',
    label,
    markupType: 'option',
    outputType 
  }
}

export const primitiveMarkupOptions = {
  array: Object.entries(typeSystem.Array).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  arrayBoolean: [],
  arrayArray: [],
  arrayBytes: [],
  arrayFloat: [],
  arrayInteger: [],
  arrayMap: [],
  arrayResult: [],
  arrayString: [],
  boolean: Object.entries(typeSystem.Boolean).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  bytes: Object.entries(typeSystem.Bytes).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  filterOutput: [],
  float: Object.entries(typeSystem.Float).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  matchOutput: [],
  reducerOutput: [],
  result: Object.entries(typeSystem.Result).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  string: Object.entries(typeSystem.String).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  subscriptOutput: [],
  map: Object.entries(typeSystem.Map).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
  integer: Object.entries(typeSystem.Integer).map(x => {
    generateOption(x[1][0], x[1][1])
  }),
}

export const markupOptions: {[key: string]: Array<any>} = {
  array: [...primitiveMarkupOptions.array],
  arrayArray: [...primitiveMarkupOptions.arrayArray],
  arrayBoolean: [...primitiveMarkupOptions.arrayBoolean],
  arrayBytes: [...primitiveMarkupOptions.arrayBytes],
  arrayFloat: [...primitiveMarkupOptions.arrayFloat],
  arrayInteger: [...primitiveMarkupOptions.arrayInteger],
  arrayMap: [...primitiveMarkupOptions.arrayMap],
  arrayResult: [...primitiveMarkupOptions.arrayResult],
  arrayString: [...primitiveMarkupOptions.arrayString],
  boolean: [...primitiveMarkupOptions.boolean, ...primitiveMarkupOptions.string],
  bytes: [...primitiveMarkupOptions.bytes, ...primitiveMarkupOptions.string],
  filterOutput: [...primitiveMarkupOptions.filterOutput],
  float: [...primitiveMarkupOptions.float, ...primitiveMarkupOptions.string],
  integer: [
    ...primitiveMarkupOptions.integer,
    ...primitiveMarkupOptions.float,
    ...primitiveMarkupOptions.string,
  ],
  map: [...primitiveMarkupOptions.map],
  matchOutput: [...primitiveMarkupOptions.matchOutput],
  reducerOutput: [...primitiveMarkupOptions.reducerOutput],
  result: [...primitiveMarkupOptions.result],
  string: [...primitiveMarkupOptions.string],
  subscriptOutput: [...primitiveMarkupOptions.subscriptOutput],
}