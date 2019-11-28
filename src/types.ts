export enum Type {
  Boolean = 'Boolean',
  Integer = 'Integer',
  Float = 'Float',
  String = 'String',
  Array = 'Array',
  Map = 'Map',
  Bytes = 'Bytes',
  Result = 'Result',
}

export enum Reducer {
  min = 0x00,
  max = 0x01,
  mode = 0x02,
  averageMean = 0x03,
  averageMeanWeighted = 0x04,
  averageMedian = 0x05,
  averageMedianWeighted = 0x06,
  deviationStandard = 0x07,
  deviationAverage = 0x08,
  deviationMedian = 0x09,
  deviationMaximum = 0x0a,
}

export enum Filter {
  greaterThan = 0x00,
  LessThan = 0x01,
  equals = 0x02,
  deviationAbsolute = 0x03,
  deviationRelative = 0x04,
  deviationStandard = 0x05,
  top = 0x06,
  bottom = 0x07,
  lessOrEqualThan = 0x80,
  greaterOrEqualThan = 0x81,
  notEquals = 0x82,
  notDeviationAbsolute = 0x83,
  notDeviationRelative = 0x84,
  notDeviationStandard = 0x85,
  notTop = 0x86,
  notBottom = 0x87,
}

export enum OutputType {
  Boolean = 'boolean',
  Integer = 'integer',
  Float = 'float',
  String = 'string',
  Array = 'array',
  Map = 'map',
  Bytes = 'bytes',
  Result = 'result',
  SubscriptOutput = 'subscriptOutput',
  ReducerOutput = 'reducerOutput',
  FilterOutput = 'filterOutput',
  MatchOutput = 'MatchOutput',
  ArrayArray = 'ArrayArray',
  ArrayBoolean = 'ArrayBoolean',
  ArrayInteger = 'ArrayInteger',
  ArrayFloat = 'ArrayFloat',
  ArrayString = 'ArrayString',
  ArrayMap = 'ArrayMap',
  ArrayBytes = 'ArrayBytes',
  ArrayResult = 'ArrayResult',

  Inner = 'inner',
  Same = 'same',
}

export enum MarkupHierarchicalType {
  Operator = 'operator',
  SelectedOperatorOption = 'selectedOperatorOption',
  OperatorOption = 'operatorOption',
  Argument = 'argument',
}

export type MarkupOption = {
  hierarchicalType: MarkupHierarchicalType.OperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export interface MarkupSelectedOption {
  // arguments: Array<MarkupInput | MarkupSelect> | []
  arguments: Array<MarkupInput | MarkupSelect> | []
  hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export type MarkupInput = {
  id: number
  label: string
  markupType: MarkupType.Input
  hierarchicalType: MarkupHierarchicalType.Argument
  value: string | number | boolean
}

export type MarkupSelect = {
  id: number
  scriptId: number
  markupType: MarkupType.Select
  hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument
  outputType: Array<OutputType> | OutputType
  selected: MarkupSelectedOption
  options: Array<MarkupOption>
  label?: string
}

export enum MarkupType {
  Select = 'select',
  Option = 'option',
  Input = 'input',
}
export type MarkupOperator = MarkupSelect
export type MarkupArgument = MarkupSelect | MarkupInput
export type MarkupSource = {
  url: string
  script: MarkupScript
}

export type MarkupScript = Array<MarkupOperator>

export type MarkupRequest = {
  notBefore: number
  retrieve: Array<MarkupSource>
  aggregate: MarkupScript
  tally: MarkupScript
}

export type Markup = {
  name: string
  description: string
  radRequest: MarkupRequest
}

export enum OperatorCode {
  ArrayCount = 0x10,
  ArrayFilter = 0x11,
  ArrayFlatten = 0x12,
  ArrayGetArray = 0x13,
  ArrayGetBoolean = 0x14,
  ArrayGetBytes = 0x15,
  ArrayGetInteger = 0x16,
  ArrayGetFloat = 0x17,
  ArrayGetMap = 0x18,
  ArrayGetResult = 0x19,
  ArrayGetString = 0x1a,
  ArrayMap = 0x1b,
  ArrayReduce = 0x1c,
  ArraySome = 0x1d,
  ArraySort = 0x1e,
  ArrayTake = 0x1f,

  BooleanMatch = 0x20,
  BooleanNegate = 0x21,

  BytesAsString = 0x30,
  BytesHash = 0x31,

  IntegerAbsolute = 0x40,
  IntegerAsFloat = 0x41,
  IntegerAsString = 0x42,
  IntegerGreaterThan = 0x43,
  IntegerLessThan = 0x44,
  IntegerMatch = 0x45,
  IntegerModulo = 0x46,
  IntegerMultiply = 0x47,
  IntegerNegate = 0x48,
  IntegerPower = 0x49,
  IntegerReciprocal = 0x4a,
  IntegerSum = 0x4b,
  
  FloatAbsolute = 0x50,
  FloatAsString = 0x51,
  FloatCeiling = 0x52,
  FloatGraterThan = 0x53,
  FloatFloor = 0x54,
  FloatLessThan = 0x55,
  FloatModulo = 0x56,
  FloatMultiply = 0x57,
  FloatNegate = 0x58,
  FloatPower = 0x59,
  FloatReciprocal = 0x5a,
  FloatRound = 0x5b,
  Floatsum = 0x5c,
  FloatTruncate = 0x5d,

  MapEntries = 0x60,
  MapGetArray = 0x61,
  MapGetBoolean = 0x62,
  MapGetBytes = 0x63,
  MapGetInteger = 0x64,
  MapGetFloat = 0x65,
  MapGetMap = 0x66,
  MapGetString = 0x67,
  MapKeys = 0x68,
  MapValuesArray = 0x69,
  MapValuesBoolean = 0x6a,
  MapValuesBytes = 0x6b,
  MapValuesInteger = 0x6c,
  MapValuesFloat = 0x6d,
  MapValuesMap = 0x6e,
  MapValuesString = 0x6f,

  ResultGet = 0x70,
  ResultGetOr = 0x71,
  ResultIsOk = 0x72,
  
  StringAsBoolean = 0x80,
  StringAsBytes = 0x81,
  StringAsFloat = 0x82,
  StringAsInteger = 0x83,
  StringLength = 0x84,
  StringMatch = 0x85,
  StringParseJsonArray = 0x86,
  StringParseJsonBoolean = 0x86,
  StringParseJsonInteger = 0x87,
  StringParseJsonFloat = 0x88,
  StringParseJsonMap = 0x89,
  StringParseJsonString = 0x8a,
  StringParseXML = 0x8b,
  StringToLowerCase = 0x8c,
  StringToUpperCase = 0x8d,
}

export enum MirArgumentKind {
  Array,
  Boolean,
  Bytes,
  Filter,
  Float,
  Inner,
  Integer,
  Map,
  Mapper,
  Passthrough,
  Reducer,
  Result,
  String,
}

export type MirArgument =
  | string
  | number
  | boolean
  | [Filter, number]
  | [Filter, string]
  | [Filter, boolean]
  | Reducer

export type MirOperator =
  | OperatorCode
  | [OperatorCode, MirArgument]
  | [OperatorCode, MirArgument, MirArgument]

export type MirScript = Array<MirOperator>

export type MirSource = {
  url: string
  script: MirScript
}

export type MirRequest = {
  notBefore: number
  retrieve: Array<MirSource>
  aggregate: MirScript
  tally: MirScript
}

export type Mir = {
  name: string
  description: string
  radRequest: MirRequest
}

export type GeneratedMarkupScript = {
  cache: any
  script: MarkupScript
}
export type OperatorInfo = {
  outputType: OutputType
  type: Type
  name: string
  arguments: Array<ArgumentInfo>
}

export type ArgumentInfo = { name: string; optional: boolean; type: MirArgumentKind }

export type OperatorInfos = {
  [T in OperatorCode]: OperatorInfo
}

export enum ArrayOperatorName {
  Count = 'count',
  Filter = 'filter',
  Flatten = 'flatten',
  GetArray = 'getArray',
  GetBoolean = 'getBoolean',
  GetBytes = 'getBytes',
  GetInteger = 'getInteger',
  GetFloat = 'getInteger',
  GetMap = 'getInteger',
  GetResult = 'getInteger',
  GetString = 'getInteger',
  Map = 'map',
  Reduce = 'reduce',
  Some = 'some',
  Sort = 'sort',
  Take = 'take',
}

export enum BooleanOperatorName {
  Negate = 'negate',
  Match = 'match',
}

export enum BytesOperatorName {
  AsString = 'asString',
  Hash = 'hash',
}

export enum IntegerOperatorName {
  Absolute = 'absolute',
  AsFloat = 'asFloat',
  AsString = 'asString',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Match = 'match',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Reciprocal = 'reciprocal',
  Sum = 'sum',
}

export enum FloatOperatorName {
  Absolute = 'absolute',
  AsString = 'asString',
  Ceiling = 'ceiling',
  GreaterThan = 'greaterThan',
  Floor = 'floor',
  LessThan = 'lessThan',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Reciprocal = 'reciprocal',
  Round = 'round',
  Sum = 'sum',
  Truncate = 'truncate',
}

export enum MapOperatorName {
  Entries = 'entries',
  GetArray = 'GetArray',
  GetBoolean = 'GetBoolean',
  GetBytes = 'GetArray',
  GetInteger = 'GetInteger',
  GetFloat = 'GetFloat',
  GetMap = 'GetMap',
  GetString = 'GetString',
  Keys = 'keys',
  valuesArray = 'valuesArray',
  valuesBoolean = 'valuesBoolean',
  valuesBytes = 'valuesBytes',
  valuesInteger = 'valuesInteger',
  valuesFloat = 'valuesFloat',
  valuesMap = 'valuesMap',
  valuesString = 'valuesString',
}

export enum ResultOperatorName {
  Get = 'get',
  GetOr = 'getOr',
  IsOk = 'isOk',
}

export enum StringOperatorName {
  AsBoolean = 'asBoolean',
  AsBytes = 'asBytes',
  AsFloat = 'asFloat',
  AsInteger = 'asInteger',
  Length = 'length',
  Match = 'match',
  ParseJsonArray = 'parseJsonArray',
  ParseJsonBoolean = 'parseJsonBoolean',
  ParseJsonInteger = 'parseJsonInteger',
  ParseJsonFloat = 'parseJsonFloat',
  ParseJsonMap = 'parseJsonMap',
  ParseJsonString = 'parseJsonString',
  ParseXml = 'parseXml',
  ToLowerCase = 'toLowerCase',
  ToUpperCase = 'toUpperCase',
}

export type OperatorName =
  | BooleanOperatorName
  | IntegerOperatorName
  | FloatOperatorName
  | StringOperatorName
  | ArrayOperatorName
  | MapOperatorName
  | BytesOperatorName
  | ResultOperatorName

export type TypeSystem = {
  [Type.Boolean]: {
    [B in BooleanOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Integer]: {
    [I in IntegerOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Float]: {
    [F in FloatOperatorName]: [OperatorCode, OutputType]
  }
  [Type.String]: {
    [S in StringOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Array]: {
    [A in ArrayOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Map]: {
    [M in MapOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Bytes]: {
    [B in BytesOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Result]: {
    [R in ResultOperatorName]: [OperatorCode, OutputType]
  }
}

export type TypeSystemEntry =
  | [Type, { [B in BooleanOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [I in IntegerOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [F in FloatOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [S in StringOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [A in ArrayOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [M in MapOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [B in BytesOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [R in ResultOperatorName]: [OperatorCode, Array<OutputType>] }]

export type TypeSystemValue = [string, [OperatorCode, Array<OutputType>]]

export type FilterArgument = [Filter, number] | [Filter, string] | [Filter, boolean]

export type CacheRef = { id: number }

export type CachedMarkupSelect = {
  id: number
  scriptId: number
  markupType: MarkupType.Select
  hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument
  outputType: Array<OutputType> | OutputType
  selected: CacheRef
  options: Array<MarkupOption>
  label?: string
}

export type CachedMarkupOperator = CachedMarkupSelect
export type CachedMarkupScript = Array<CacheRef>

export type CachedMarkupRequest = {
  notBefore: number
  retrieve: Array<CachedMarkupSource>
  aggregate: CachedMarkupScript
  tally: CachedMarkupScript
}

export type CachedMarkupSource = {
  url: string
  script: CachedMarkupScript
}

export type CachedMarkup = {
  name: string
  description: string
  radRequest: CachedMarkupRequest
}

export type CachedMarkupSelectedOption = {
  arguments: Array<CacheRef> | []
  hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export type CachedArgument = MarkupInput | CachedMarkupSelect