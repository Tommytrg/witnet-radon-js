export declare enum Stage {
    Retrieve = "retrieve",
    Aggregate = "aggregate",
    Tally = "tally"
}
export declare enum Type {
    Boolean = "Boolean",
    Integer = "Integer",
    Float = "Float",
    String = "String",
    Array = "Array",
    Map = "Map",
    Bytes = "Bytes",
    Result = "Result"
}
export declare enum Reducer {
    min = 0,
    max = 1,
    mode = 2,
    averageMean = 3,
    averageMeanWeighted = 4,
    averageMedian = 5,
    averageMedianWeighted = 6,
    deviationStandard = 7,
    deviationAverage = 8,
    deviationMedian = 9,
    deviationMaximum = 10
}
export declare enum Filter {
    greaterThan = 0,
    LessThan = 1,
    equals = 2,
    deviationAbsolute = 3,
    deviationRelative = 4,
    deviationStandard = 5,
    top = 6,
    bottom = 7,
    lessOrEqualThan = 128,
    greaterOrEqualThan = 129,
    notEquals = 130,
    notDeviationAbsolute = 131,
    notDeviationRelative = 132,
    notDeviationStandard = 133,
    notTop = 134,
    notBottom = 135
}
export declare enum OutputType {
    Boolean = "boolean",
    Integer = "integer",
    Float = "float",
    String = "string",
    Array = "array",
    Map = "map",
    Bytes = "bytes",
    Result = "result",
    SubscriptOutput = "subscriptOutput",
    ReducerOutput = "reducerOutput",
    FilterOutput = "filterOutput",
    MatchOutput = "matchOutput",
    ArrayArray = "arrayArray",
    ArrayBoolean = "arrayBoolean",
    ArrayInteger = "arrayInteger",
    ArrayFloat = "arrayFloat",
    ArrayString = "arrayString",
    ArrayMap = "arrayMap",
    ArrayBytes = "arrayBytes",
    ArrayResult = "arrayResult",
    Inner = "inner",
    Same = "same"
}
export declare enum MarkupHierarchicalType {
    Operator = "operator",
    SelectedOperatorOption = "selectedOperatorOption",
    OperatorOption = "operatorOption",
    Argument = "argument"
}
export declare type MarkupOption = {
    hierarchicalType: MarkupHierarchicalType.OperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType | Array<OutputType>;
};
export interface MarkupSelectedOption {
    arguments: Array<MarkupInput | MarkupSelect> | [];
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType | Array<OutputType>;
}
export declare type MarkupInput = {
    id: number;
    label: string;
    markupType: MarkupType.Input;
    hierarchicalType: MarkupHierarchicalType.Argument;
    value: string | number | boolean;
};
export declare type MarkupSelect = {
    id: number;
    scriptId: number;
    markupType: MarkupType.Select;
    hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument;
    outputType: Array<OutputType> | OutputType;
    selected: MarkupSelectedOption;
    options: Array<MarkupOption>;
    label: string;
};
export declare enum MarkupType {
    Select = "select",
    Option = "option",
    Input = "input"
}
export declare type MarkupOperator = MarkupSelect;
export declare type MarkupArgument = MarkupSelect | MarkupInput;
export declare type MarkupSource = {
    kind: string;
    url: string;
    script: MarkupScript;
};
export declare type MarkupScript = Array<MarkupOperator>;
export declare type MarkupRequest = {
    notBefore: number;
    retrieve: Array<MarkupSource>;
    aggregate: MarkupScript;
    tally: MarkupScript;
};
export declare type Markup = {
    name: string;
    description: string;
    radRequest: MarkupRequest;
};
export declare enum OperatorCode {
    ArrayCount = 16,
    ArrayFilter = 17,
    ArrayFlatten = 18,
    ArrayGetArray = 19,
    ArrayGetBoolean = 20,
    ArrayGetBytes = 21,
    ArrayGetInteger = 22,
    ArrayGetFloat = 23,
    ArrayGetMap = 24,
    ArrayGetResult = 25,
    ArrayGetString = 26,
    ArrayMap = 27,
    ArrayReduce = 28,
    ArraySome = 29,
    ArraySort = 30,
    ArrayTake = 31,
    BooleanMatch = 32,
    BooleanNegate = 33,
    BytesAsString = 48,
    BytesHash = 49,
    IntegerAbsolute = 64,
    IntegerAsFloat = 65,
    IntegerAsString = 66,
    IntegerGreaterThan = 67,
    IntegerLessThan = 68,
    IntegerMatch = 69,
    IntegerModulo = 70,
    IntegerMultiply = 71,
    IntegerNegate = 72,
    IntegerPower = 73,
    IntegerReciprocal = 74,
    IntegerSum = 75,
    FloatAbsolute = 80,
    FloatAsString = 81,
    FloatCeiling = 82,
    FloatGraterThan = 83,
    FloatFloor = 84,
    FloatLessThan = 85,
    FloatModulo = 86,
    FloatMultiply = 87,
    FloatNegate = 88,
    FloatPower = 89,
    FloatReciprocal = 90,
    FloatRound = 91,
    Floatsum = 92,
    FloatTruncate = 93,
    MapEntries = 96,
    MapGetArray = 97,
    MapGetBoolean = 98,
    MapGetBytes = 99,
    MapGetInteger = 100,
    MapGetFloat = 101,
    MapGetMap = 102,
    MapGetString = 103,
    MapKeys = 104,
    MapValuesArray = 105,
    MapValuesBoolean = 106,
    MapValuesBytes = 107,
    MapValuesInteger = 108,
    MapValuesFloat = 109,
    MapValuesMap = 110,
    MapValuesString = 111,
    ResultGet = 112,
    ResultGetOr = 113,
    ResultIsOk = 114,
    StringAsBoolean = 128,
    StringAsBytes = 129,
    StringAsFloat = 130,
    StringAsInteger = 131,
    StringLength = 132,
    StringMatch = 133,
    StringParseJsonArray = 134,
    StringParseJsonBoolean = 134,
    StringParseJsonInteger = 135,
    StringParseJsonFloat = 136,
    StringParseJsonMap = 137,
    StringParseJsonString = 138,
    StringParseXML = 139,
    StringToLowerCase = 140,
    StringToUpperCase = 141
}
export declare enum MirArgumentKind {
    Array = 0,
    Boolean = 1,
    Bytes = 2,
    Filter = 3,
    Float = 4,
    Inner = 5,
    Integer = 6,
    Map = 7,
    Mapper = 8,
    Passthrough = 9,
    Reducer = 10,
    Result = 11,
    String = 12
}
export declare type MirArgument = string | number | boolean | [Filter, number] | [Filter, string] | [Filter, boolean] | Reducer;
export declare type MirOperator = OperatorCode | [OperatorCode, MirArgument] | [OperatorCode, MirArgument, MirArgument];
export declare type MirScript = Array<MirOperator>;
export declare type MirSource = {
    kind: string;
    url: string;
    script: MirScript;
};
export declare type MirRequest = {
    notBefore: number;
    retrieve: Array<MirSource>;
    aggregate: MirScript;
    tally: MirScript;
};
export declare type Mir = {
    name: string;
    description: string;
    radRequest: MirRequest;
};
export declare type GeneratedMarkupScript = {
    cache: any;
    script: MarkupScript;
};
export declare type OperatorInfo = {
    outputType: OutputType;
    type: Type;
    name: string;
    arguments: Array<ArgumentInfo>;
};
export declare type ArgumentInfo = {
    name: string;
    optional: boolean;
    type: MirArgumentKind;
};
export declare type OperatorInfos = {
    [T in OperatorCode]: OperatorInfo;
};
export declare enum ArrayOperatorName {
    Count = "count",
    Filter = "filter",
    Flatten = "flatten",
    GetArray = "getArray",
    GetBoolean = "getBoolean",
    GetBytes = "getBytes",
    GetInteger = "getInteger",
    GetFloat = "getInteger",
    GetMap = "getInteger",
    GetResult = "getInteger",
    GetString = "getInteger",
    Map = "map",
    Reduce = "reduce",
    Some = "some",
    Sort = "sort",
    Take = "take"
}
export declare enum BooleanOperatorName {
    Negate = "negate",
    Match = "match"
}
export declare enum BytesOperatorName {
    AsString = "asString",
    Hash = "hash"
}
export declare enum IntegerOperatorName {
    Absolute = "absolute",
    AsFloat = "asFloat",
    AsString = "asString",
    GreaterThan = "greaterThan",
    LessThan = "lessThan",
    Match = "match",
    Modulo = "modulo",
    Multiply = "multiply",
    Negate = "negate",
    Power = "power",
    Reciprocal = "reciprocal",
    Sum = "sum"
}
export declare enum FloatOperatorName {
    Absolute = "absolute",
    AsString = "asString",
    Ceiling = "ceiling",
    GreaterThan = "greaterThan",
    Floor = "floor",
    LessThan = "lessThan",
    Modulo = "modulo",
    Multiply = "multiply",
    Negate = "negate",
    Power = "power",
    Reciprocal = "reciprocal",
    Round = "round",
    Sum = "sum",
    Truncate = "truncate"
}
export declare enum MapOperatorName {
    Entries = "entries",
    GetArray = "GetArray",
    GetBoolean = "GetBoolean",
    GetBytes = "GetArray",
    GetInteger = "GetInteger",
    GetFloat = "GetFloat",
    GetMap = "GetMap",
    GetString = "GetString",
    Keys = "keys",
    valuesArray = "valuesArray",
    valuesBoolean = "valuesBoolean",
    valuesBytes = "valuesBytes",
    valuesInteger = "valuesInteger",
    valuesFloat = "valuesFloat",
    valuesMap = "valuesMap",
    valuesString = "valuesString"
}
export declare enum ResultOperatorName {
    Get = "get",
    GetOr = "getOr",
    IsOk = "isOk"
}
export declare enum StringOperatorName {
    AsBoolean = "asBoolean",
    AsBytes = "asBytes",
    AsFloat = "asFloat",
    AsInteger = "asInteger",
    Length = "length",
    Match = "match",
    ParseJsonArray = "parseJsonArray",
    ParseJsonBoolean = "parseJsonBoolean",
    ParseJsonInteger = "parseJsonInteger",
    ParseJsonFloat = "parseJsonFloat",
    ParseJsonMap = "parseJsonMap",
    ParseJsonString = "parseJsonString",
    ParseXml = "parseXml",
    ToLowerCase = "toLowerCase",
    ToUpperCase = "toUpperCase"
}
export declare type OperatorName = BooleanOperatorName | IntegerOperatorName | FloatOperatorName | StringOperatorName | ArrayOperatorName | MapOperatorName | BytesOperatorName | ResultOperatorName;
export declare type TypeSystem = {
    [Type.Boolean]: {
        [B in BooleanOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Integer]: {
        [I in IntegerOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Float]: {
        [F in FloatOperatorName]: [OperatorCode, OutputType];
    };
    [Type.String]: {
        [S in StringOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Array]: {
        [A in ArrayOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Map]: {
        [M in MapOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Bytes]: {
        [B in BytesOperatorName]: [OperatorCode, OutputType];
    };
    [Type.Result]: {
        [R in ResultOperatorName]: [OperatorCode, OutputType];
    };
};
export declare type TypeSystemEntry = [Type, {
    [B in BooleanOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [I in IntegerOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [F in FloatOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [S in StringOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [A in ArrayOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [M in MapOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [B in BytesOperatorName]: [OperatorCode, OutputType];
}] | [Type, {
    [R in ResultOperatorName]: [OperatorCode, OutputType];
}];
export declare type TypeSystemValue = [string, [OperatorCode, OutputType]];
export declare type FilterArgument = [Filter, number] | [Filter, string] | [Filter, boolean];
export declare type CacheRef = {
    id: number;
};
export declare type CachedMarkupSelect = {
    id: number;
    scriptId: number;
    markupType: MarkupType.Select;
    hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument;
    outputType: Array<OutputType> | OutputType;
    selected: CacheRef;
    options: Array<MarkupOption>;
};
export declare type CachedMarkupOperator = CachedMarkupSelect;
export declare type CachedMarkupScript = Array<CacheRef>;
export declare type CachedMarkupRequest = {
    notBefore: number;
    retrieve: Array<CachedMarkupSource>;
    aggregate: CachedMarkupScript;
    tally: CachedMarkupScript;
};
export declare type CachedMarkupSource = {
    kind: string;
    url: string;
    script: CachedMarkupScript;
};
export declare type CachedMarkup = {
    name: string;
    description: string;
    radRequest: CachedMarkupRequest;
};
export declare type CachedMarkupSelectedOption = {
    arguments: Array<CacheRef> | [];
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType;
};
export declare type CachedArgument = MarkupInput | CachedMarkupSelect;
//# sourceMappingURL=types.d.ts.map