"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type["Boolean"] = "Boolean";
    Type["Integer"] = "Integer";
    Type["Float"] = "Float";
    Type["String"] = "String";
    Type["Array"] = "Array";
    Type["Map"] = "Map";
    Type["Bytes"] = "Bytes";
    Type["Result"] = "Result";
})(Type = exports.Type || (exports.Type = {}));
var Reducer;
(function (Reducer) {
    Reducer[Reducer["min"] = 0] = "min";
    Reducer[Reducer["max"] = 1] = "max";
    Reducer[Reducer["mode"] = 2] = "mode";
    Reducer[Reducer["averageMean"] = 3] = "averageMean";
    Reducer[Reducer["averageMeanWeighted"] = 4] = "averageMeanWeighted";
    Reducer[Reducer["averageMedian"] = 5] = "averageMedian";
    Reducer[Reducer["averageMedianWeighted"] = 6] = "averageMedianWeighted";
    Reducer[Reducer["deviationStandard"] = 7] = "deviationStandard";
    Reducer[Reducer["deviationAverage"] = 8] = "deviationAverage";
    Reducer[Reducer["deviationMedian"] = 9] = "deviationMedian";
    Reducer[Reducer["deviationMaximum"] = 10] = "deviationMaximum";
})(Reducer = exports.Reducer || (exports.Reducer = {}));
var Filter;
(function (Filter) {
    Filter[Filter["greaterThan"] = 0] = "greaterThan";
    Filter[Filter["LessThan"] = 1] = "LessThan";
    Filter[Filter["equals"] = 2] = "equals";
    Filter[Filter["deviationAbsolute"] = 3] = "deviationAbsolute";
    Filter[Filter["deviationRelative"] = 4] = "deviationRelative";
    Filter[Filter["deviationStandard"] = 5] = "deviationStandard";
    Filter[Filter["top"] = 6] = "top";
    Filter[Filter["bottom"] = 7] = "bottom";
    Filter[Filter["lessOrEqualThan"] = 128] = "lessOrEqualThan";
    Filter[Filter["greaterOrEqualThan"] = 129] = "greaterOrEqualThan";
    Filter[Filter["notEquals"] = 130] = "notEquals";
    Filter[Filter["notDeviationAbsolute"] = 131] = "notDeviationAbsolute";
    Filter[Filter["notDeviationRelative"] = 132] = "notDeviationRelative";
    Filter[Filter["notDeviationStandard"] = 133] = "notDeviationStandard";
    Filter[Filter["notTop"] = 134] = "notTop";
    Filter[Filter["notBottom"] = 135] = "notBottom";
})(Filter = exports.Filter || (exports.Filter = {}));
var OutputType;
(function (OutputType) {
    OutputType["Boolean"] = "boolean";
    OutputType["Integer"] = "integer";
    OutputType["Float"] = "float";
    OutputType["String"] = "string";
    OutputType["Array"] = "array";
    OutputType["Map"] = "map";
    OutputType["Bytes"] = "bytes";
    OutputType["Result"] = "result";
    OutputType["SubscriptOutput"] = "subscriptOutput";
    OutputType["ReducerOutput"] = "reducerOutput";
    OutputType["FilterOutput"] = "filterOutput";
    OutputType["MatchOutput"] = "matchOutput";
    OutputType["ArrayArray"] = "arrayArray";
    OutputType["ArrayBoolean"] = "arrayBoolean";
    OutputType["ArrayInteger"] = "arrayInteger";
    OutputType["ArrayFloat"] = "arrayFloat";
    OutputType["ArrayString"] = "arrayString";
    OutputType["ArrayMap"] = "arrayMap";
    OutputType["ArrayBytes"] = "arrayBytes";
    OutputType["ArrayResult"] = "arrayResult";
    OutputType["Inner"] = "inner";
    OutputType["Same"] = "same";
})(OutputType = exports.OutputType || (exports.OutputType = {}));
var MarkupHierarchicalType;
(function (MarkupHierarchicalType) {
    MarkupHierarchicalType["Operator"] = "operator";
    MarkupHierarchicalType["SelectedOperatorOption"] = "selectedOperatorOption";
    MarkupHierarchicalType["OperatorOption"] = "operatorOption";
    MarkupHierarchicalType["Argument"] = "argument";
})(MarkupHierarchicalType = exports.MarkupHierarchicalType || (exports.MarkupHierarchicalType = {}));
var MarkupType;
(function (MarkupType) {
    MarkupType["Select"] = "select";
    MarkupType["Option"] = "option";
    MarkupType["Input"] = "input";
})(MarkupType = exports.MarkupType || (exports.MarkupType = {}));
var OperatorCode;
(function (OperatorCode) {
    OperatorCode[OperatorCode["ArrayCount"] = 16] = "ArrayCount";
    OperatorCode[OperatorCode["ArrayFilter"] = 17] = "ArrayFilter";
    OperatorCode[OperatorCode["ArrayFlatten"] = 18] = "ArrayFlatten";
    OperatorCode[OperatorCode["ArrayGetArray"] = 19] = "ArrayGetArray";
    OperatorCode[OperatorCode["ArrayGetBoolean"] = 20] = "ArrayGetBoolean";
    OperatorCode[OperatorCode["ArrayGetBytes"] = 21] = "ArrayGetBytes";
    OperatorCode[OperatorCode["ArrayGetInteger"] = 22] = "ArrayGetInteger";
    OperatorCode[OperatorCode["ArrayGetFloat"] = 23] = "ArrayGetFloat";
    OperatorCode[OperatorCode["ArrayGetMap"] = 24] = "ArrayGetMap";
    OperatorCode[OperatorCode["ArrayGetResult"] = 25] = "ArrayGetResult";
    OperatorCode[OperatorCode["ArrayGetString"] = 26] = "ArrayGetString";
    OperatorCode[OperatorCode["ArrayMap"] = 27] = "ArrayMap";
    OperatorCode[OperatorCode["ArrayReduce"] = 28] = "ArrayReduce";
    OperatorCode[OperatorCode["ArraySome"] = 29] = "ArraySome";
    OperatorCode[OperatorCode["ArraySort"] = 30] = "ArraySort";
    OperatorCode[OperatorCode["ArrayTake"] = 31] = "ArrayTake";
    OperatorCode[OperatorCode["BooleanMatch"] = 32] = "BooleanMatch";
    OperatorCode[OperatorCode["BooleanNegate"] = 33] = "BooleanNegate";
    OperatorCode[OperatorCode["BytesAsString"] = 48] = "BytesAsString";
    OperatorCode[OperatorCode["BytesHash"] = 49] = "BytesHash";
    OperatorCode[OperatorCode["IntegerAbsolute"] = 64] = "IntegerAbsolute";
    OperatorCode[OperatorCode["IntegerAsFloat"] = 65] = "IntegerAsFloat";
    OperatorCode[OperatorCode["IntegerAsString"] = 66] = "IntegerAsString";
    OperatorCode[OperatorCode["IntegerGreaterThan"] = 67] = "IntegerGreaterThan";
    OperatorCode[OperatorCode["IntegerLessThan"] = 68] = "IntegerLessThan";
    OperatorCode[OperatorCode["IntegerMatch"] = 69] = "IntegerMatch";
    OperatorCode[OperatorCode["IntegerModulo"] = 70] = "IntegerModulo";
    OperatorCode[OperatorCode["IntegerMultiply"] = 71] = "IntegerMultiply";
    OperatorCode[OperatorCode["IntegerNegate"] = 72] = "IntegerNegate";
    OperatorCode[OperatorCode["IntegerPower"] = 73] = "IntegerPower";
    OperatorCode[OperatorCode["IntegerReciprocal"] = 74] = "IntegerReciprocal";
    OperatorCode[OperatorCode["IntegerSum"] = 75] = "IntegerSum";
    OperatorCode[OperatorCode["FloatAbsolute"] = 80] = "FloatAbsolute";
    OperatorCode[OperatorCode["FloatAsString"] = 81] = "FloatAsString";
    OperatorCode[OperatorCode["FloatCeiling"] = 82] = "FloatCeiling";
    OperatorCode[OperatorCode["FloatGraterThan"] = 83] = "FloatGraterThan";
    OperatorCode[OperatorCode["FloatFloor"] = 84] = "FloatFloor";
    OperatorCode[OperatorCode["FloatLessThan"] = 85] = "FloatLessThan";
    OperatorCode[OperatorCode["FloatModulo"] = 86] = "FloatModulo";
    OperatorCode[OperatorCode["FloatMultiply"] = 87] = "FloatMultiply";
    OperatorCode[OperatorCode["FloatNegate"] = 88] = "FloatNegate";
    OperatorCode[OperatorCode["FloatPower"] = 89] = "FloatPower";
    OperatorCode[OperatorCode["FloatReciprocal"] = 90] = "FloatReciprocal";
    OperatorCode[OperatorCode["FloatRound"] = 91] = "FloatRound";
    OperatorCode[OperatorCode["Floatsum"] = 92] = "Floatsum";
    OperatorCode[OperatorCode["FloatTruncate"] = 93] = "FloatTruncate";
    OperatorCode[OperatorCode["MapEntries"] = 96] = "MapEntries";
    OperatorCode[OperatorCode["MapGetArray"] = 97] = "MapGetArray";
    OperatorCode[OperatorCode["MapGetBoolean"] = 98] = "MapGetBoolean";
    OperatorCode[OperatorCode["MapGetBytes"] = 99] = "MapGetBytes";
    OperatorCode[OperatorCode["MapGetInteger"] = 100] = "MapGetInteger";
    OperatorCode[OperatorCode["MapGetFloat"] = 101] = "MapGetFloat";
    OperatorCode[OperatorCode["MapGetMap"] = 102] = "MapGetMap";
    OperatorCode[OperatorCode["MapGetString"] = 103] = "MapGetString";
    OperatorCode[OperatorCode["MapKeys"] = 104] = "MapKeys";
    OperatorCode[OperatorCode["MapValuesArray"] = 105] = "MapValuesArray";
    OperatorCode[OperatorCode["MapValuesBoolean"] = 106] = "MapValuesBoolean";
    OperatorCode[OperatorCode["MapValuesBytes"] = 107] = "MapValuesBytes";
    OperatorCode[OperatorCode["MapValuesInteger"] = 108] = "MapValuesInteger";
    OperatorCode[OperatorCode["MapValuesFloat"] = 109] = "MapValuesFloat";
    OperatorCode[OperatorCode["MapValuesMap"] = 110] = "MapValuesMap";
    OperatorCode[OperatorCode["MapValuesString"] = 111] = "MapValuesString";
    OperatorCode[OperatorCode["ResultGet"] = 112] = "ResultGet";
    OperatorCode[OperatorCode["ResultGetOr"] = 113] = "ResultGetOr";
    OperatorCode[OperatorCode["ResultIsOk"] = 114] = "ResultIsOk";
    OperatorCode[OperatorCode["StringAsBoolean"] = 128] = "StringAsBoolean";
    OperatorCode[OperatorCode["StringAsBytes"] = 129] = "StringAsBytes";
    OperatorCode[OperatorCode["StringAsFloat"] = 130] = "StringAsFloat";
    OperatorCode[OperatorCode["StringAsInteger"] = 131] = "StringAsInteger";
    OperatorCode[OperatorCode["StringLength"] = 132] = "StringLength";
    OperatorCode[OperatorCode["StringMatch"] = 133] = "StringMatch";
    OperatorCode[OperatorCode["StringParseJsonArray"] = 134] = "StringParseJsonArray";
    OperatorCode[OperatorCode["StringParseJsonBoolean"] = 134] = "StringParseJsonBoolean";
    OperatorCode[OperatorCode["StringParseJsonInteger"] = 135] = "StringParseJsonInteger";
    OperatorCode[OperatorCode["StringParseJsonFloat"] = 136] = "StringParseJsonFloat";
    OperatorCode[OperatorCode["StringParseJsonMap"] = 137] = "StringParseJsonMap";
    OperatorCode[OperatorCode["StringParseJsonString"] = 138] = "StringParseJsonString";
    OperatorCode[OperatorCode["StringParseXML"] = 139] = "StringParseXML";
    OperatorCode[OperatorCode["StringToLowerCase"] = 140] = "StringToLowerCase";
    OperatorCode[OperatorCode["StringToUpperCase"] = 141] = "StringToUpperCase";
})(OperatorCode = exports.OperatorCode || (exports.OperatorCode = {}));
var MirArgumentKind;
(function (MirArgumentKind) {
    MirArgumentKind[MirArgumentKind["Array"] = 0] = "Array";
    MirArgumentKind[MirArgumentKind["Boolean"] = 1] = "Boolean";
    MirArgumentKind[MirArgumentKind["Bytes"] = 2] = "Bytes";
    MirArgumentKind[MirArgumentKind["Filter"] = 3] = "Filter";
    MirArgumentKind[MirArgumentKind["Float"] = 4] = "Float";
    MirArgumentKind[MirArgumentKind["Inner"] = 5] = "Inner";
    MirArgumentKind[MirArgumentKind["Integer"] = 6] = "Integer";
    MirArgumentKind[MirArgumentKind["Map"] = 7] = "Map";
    MirArgumentKind[MirArgumentKind["Mapper"] = 8] = "Mapper";
    MirArgumentKind[MirArgumentKind["Passthrough"] = 9] = "Passthrough";
    MirArgumentKind[MirArgumentKind["Reducer"] = 10] = "Reducer";
    MirArgumentKind[MirArgumentKind["Result"] = 11] = "Result";
    MirArgumentKind[MirArgumentKind["String"] = 12] = "String";
})(MirArgumentKind = exports.MirArgumentKind || (exports.MirArgumentKind = {}));
var ArrayOperatorName;
(function (ArrayOperatorName) {
    ArrayOperatorName["Count"] = "count";
    ArrayOperatorName["Filter"] = "filter";
    ArrayOperatorName["Flatten"] = "flatten";
    ArrayOperatorName["GetArray"] = "getArray";
    ArrayOperatorName["GetBoolean"] = "getBoolean";
    ArrayOperatorName["GetBytes"] = "getBytes";
    ArrayOperatorName["GetInteger"] = "getInteger";
    ArrayOperatorName["GetFloat"] = "getInteger";
    ArrayOperatorName["GetMap"] = "getInteger";
    ArrayOperatorName["GetResult"] = "getInteger";
    ArrayOperatorName["GetString"] = "getInteger";
    ArrayOperatorName["Map"] = "map";
    ArrayOperatorName["Reduce"] = "reduce";
    ArrayOperatorName["Some"] = "some";
    ArrayOperatorName["Sort"] = "sort";
    ArrayOperatorName["Take"] = "take";
})(ArrayOperatorName = exports.ArrayOperatorName || (exports.ArrayOperatorName = {}));
var BooleanOperatorName;
(function (BooleanOperatorName) {
    BooleanOperatorName["Negate"] = "negate";
    BooleanOperatorName["Match"] = "match";
})(BooleanOperatorName = exports.BooleanOperatorName || (exports.BooleanOperatorName = {}));
var BytesOperatorName;
(function (BytesOperatorName) {
    BytesOperatorName["AsString"] = "asString";
    BytesOperatorName["Hash"] = "hash";
})(BytesOperatorName = exports.BytesOperatorName || (exports.BytesOperatorName = {}));
var IntegerOperatorName;
(function (IntegerOperatorName) {
    IntegerOperatorName["Absolute"] = "absolute";
    IntegerOperatorName["AsFloat"] = "asFloat";
    IntegerOperatorName["AsString"] = "asString";
    IntegerOperatorName["GreaterThan"] = "greaterThan";
    IntegerOperatorName["LessThan"] = "lessThan";
    IntegerOperatorName["Match"] = "match";
    IntegerOperatorName["Modulo"] = "modulo";
    IntegerOperatorName["Multiply"] = "multiply";
    IntegerOperatorName["Negate"] = "negate";
    IntegerOperatorName["Power"] = "power";
    IntegerOperatorName["Reciprocal"] = "reciprocal";
    IntegerOperatorName["Sum"] = "sum";
})(IntegerOperatorName = exports.IntegerOperatorName || (exports.IntegerOperatorName = {}));
var FloatOperatorName;
(function (FloatOperatorName) {
    FloatOperatorName["Absolute"] = "absolute";
    FloatOperatorName["AsString"] = "asString";
    FloatOperatorName["Ceiling"] = "ceiling";
    FloatOperatorName["GreaterThan"] = "greaterThan";
    FloatOperatorName["Floor"] = "floor";
    FloatOperatorName["LessThan"] = "lessThan";
    FloatOperatorName["Modulo"] = "modulo";
    FloatOperatorName["Multiply"] = "multiply";
    FloatOperatorName["Negate"] = "negate";
    FloatOperatorName["Power"] = "power";
    FloatOperatorName["Reciprocal"] = "reciprocal";
    FloatOperatorName["Round"] = "round";
    FloatOperatorName["Sum"] = "sum";
    FloatOperatorName["Truncate"] = "truncate";
})(FloatOperatorName = exports.FloatOperatorName || (exports.FloatOperatorName = {}));
var MapOperatorName;
(function (MapOperatorName) {
    MapOperatorName["Entries"] = "entries";
    MapOperatorName["GetArray"] = "GetArray";
    MapOperatorName["GetBoolean"] = "GetBoolean";
    MapOperatorName["GetBytes"] = "GetArray";
    MapOperatorName["GetInteger"] = "GetInteger";
    MapOperatorName["GetFloat"] = "GetFloat";
    MapOperatorName["GetMap"] = "GetMap";
    MapOperatorName["GetString"] = "GetString";
    MapOperatorName["Keys"] = "keys";
    MapOperatorName["valuesArray"] = "valuesArray";
    MapOperatorName["valuesBoolean"] = "valuesBoolean";
    MapOperatorName["valuesBytes"] = "valuesBytes";
    MapOperatorName["valuesInteger"] = "valuesInteger";
    MapOperatorName["valuesFloat"] = "valuesFloat";
    MapOperatorName["valuesMap"] = "valuesMap";
    MapOperatorName["valuesString"] = "valuesString";
})(MapOperatorName = exports.MapOperatorName || (exports.MapOperatorName = {}));
var ResultOperatorName;
(function (ResultOperatorName) {
    ResultOperatorName["Get"] = "get";
    ResultOperatorName["GetOr"] = "getOr";
    ResultOperatorName["IsOk"] = "isOk";
})(ResultOperatorName = exports.ResultOperatorName || (exports.ResultOperatorName = {}));
var StringOperatorName;
(function (StringOperatorName) {
    StringOperatorName["AsBoolean"] = "asBoolean";
    StringOperatorName["AsBytes"] = "asBytes";
    StringOperatorName["AsFloat"] = "asFloat";
    StringOperatorName["AsInteger"] = "asInteger";
    StringOperatorName["Length"] = "length";
    StringOperatorName["Match"] = "match";
    StringOperatorName["ParseJsonArray"] = "parseJsonArray";
    StringOperatorName["ParseJsonBoolean"] = "parseJsonBoolean";
    StringOperatorName["ParseJsonInteger"] = "parseJsonInteger";
    StringOperatorName["ParseJsonFloat"] = "parseJsonFloat";
    StringOperatorName["ParseJsonMap"] = "parseJsonMap";
    StringOperatorName["ParseJsonString"] = "parseJsonString";
    StringOperatorName["ParseXml"] = "parseXml";
    StringOperatorName["ToLowerCase"] = "toLowerCase";
    StringOperatorName["ToUpperCase"] = "toUpperCase";
})(StringOperatorName = exports.StringOperatorName || (exports.StringOperatorName = {}));
