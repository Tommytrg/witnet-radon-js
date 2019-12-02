"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
exports.typeSystem = (_a = {},
    _a[types_1.Type.Array] = (_b = {},
        _b[types_1.ArrayOperatorName.Count] = [types_1.OperatorCode.ArrayCount, types_1.OutputType.Integer],
        _b[types_1.ArrayOperatorName.Filter] = [types_1.OperatorCode.ArrayFilter, types_1.OutputType.Same],
        _b[types_1.ArrayOperatorName.Flatten] = [types_1.OperatorCode.ArrayFlatten, types_1.OutputType.Array],
        _b[types_1.ArrayOperatorName.GetArray] = [types_1.OperatorCode.ArrayGetArray, types_1.OutputType.Array],
        _b[types_1.ArrayOperatorName.GetBoolean] = [types_1.OperatorCode.ArrayGetBoolean, types_1.OutputType.Boolean],
        _b[types_1.ArrayOperatorName.GetBytes] = [types_1.OperatorCode.ArrayGetBytes, types_1.OutputType.Bytes],
        _b[types_1.ArrayOperatorName.GetFloat] = [types_1.OperatorCode.ArrayGetFloat, types_1.OutputType.Float],
        _b[types_1.ArrayOperatorName.GetInteger] = [types_1.OperatorCode.ArrayGetInteger, types_1.OutputType.Integer],
        _b[types_1.ArrayOperatorName.GetMap] = [types_1.OperatorCode.ArrayGetMap, types_1.OutputType.Map],
        _b[types_1.ArrayOperatorName.GetResult] = [types_1.OperatorCode.ArrayGetResult, types_1.OutputType.Result],
        _b[types_1.ArrayOperatorName.GetString] = [types_1.OperatorCode.ArrayGetString, types_1.OutputType.String],
        _b[types_1.ArrayOperatorName.Map] = [types_1.OperatorCode.ArrayMap, types_1.OutputType.ArrayMap],
        _b[types_1.ArrayOperatorName.Reduce] = [types_1.OperatorCode.ArrayReduce, types_1.OutputType.Inner],
        _b[types_1.ArrayOperatorName.Some] = [types_1.OperatorCode.ArraySome, types_1.OutputType.FilterOutput],
        _b[types_1.ArrayOperatorName.Sort] = [types_1.OperatorCode.ArraySort, types_1.OutputType.Same],
        _b[types_1.ArrayOperatorName.Take] = [types_1.OperatorCode.ArrayTake, types_1.OutputType.Array],
        _b),
    _a[types_1.Type.Boolean] = (_c = {},
        _c[types_1.BooleanOperatorName.Match] = [types_1.OperatorCode.BooleanMatch, types_1.OutputType.MatchOutput],
        _c[types_1.BooleanOperatorName.Negate] = [types_1.OperatorCode.BooleanNegate, types_1.OutputType.Boolean],
        _c),
    _a[types_1.Type.Bytes] = (_d = {},
        _d[types_1.BytesOperatorName.AsString] = [types_1.OperatorCode.BytesAsString, types_1.OutputType.String],
        _d[types_1.BytesOperatorName.Hash] = [types_1.OperatorCode.BytesHash, types_1.OutputType.Bytes],
        _d),
    _a[types_1.Type.Integer] = (_e = {},
        _e[types_1.IntegerOperatorName.Absolute] = [types_1.OperatorCode.IntegerAbsolute, types_1.OutputType.Integer],
        _e[types_1.IntegerOperatorName.AsFloat] = [types_1.OperatorCode.IntegerAsFloat, types_1.OutputType.Float],
        _e[types_1.IntegerOperatorName.AsString] = [types_1.OperatorCode.IntegerAsString, types_1.OutputType.String],
        _e[types_1.IntegerOperatorName.GreaterThan] = [types_1.OperatorCode.IntegerGreaterThan, types_1.OutputType.Boolean],
        _e[types_1.IntegerOperatorName.LessThan] = [types_1.OperatorCode.IntegerLessThan, types_1.OutputType.Boolean],
        _e[types_1.IntegerOperatorName.Match] = [types_1.OperatorCode.IntegerMatch, types_1.OutputType.MatchOutput],
        _e[types_1.IntegerOperatorName.Modulo] = [types_1.OperatorCode.IntegerModulo, types_1.OutputType.Integer],
        _e[types_1.IntegerOperatorName.Multiply] = [types_1.OperatorCode.IntegerMultiply, types_1.OutputType.Integer],
        _e[types_1.IntegerOperatorName.Negate] = [types_1.OperatorCode.IntegerNegate, types_1.OutputType.Integer],
        _e[types_1.IntegerOperatorName.Power] = [types_1.OperatorCode.IntegerPower, types_1.OutputType.Integer],
        _e[types_1.IntegerOperatorName.Reciprocal] = [types_1.OperatorCode.IntegerReciprocal, types_1.OutputType.Float],
        _e[types_1.IntegerOperatorName.Sum] = [types_1.OperatorCode.IntegerSum, types_1.OutputType.Integer],
        _e),
    _a[types_1.Type.Float] = (_f = {},
        _f[types_1.FloatOperatorName.Absolute] = [types_1.OperatorCode.FloatAbsolute, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.AsString] = [types_1.OperatorCode.FloatAsString, types_1.OutputType.String],
        _f[types_1.FloatOperatorName.Ceiling] = [types_1.OperatorCode.FloatCeiling, types_1.OutputType.Integer],
        _f[types_1.FloatOperatorName.GreaterThan] = [types_1.OperatorCode.FloatGraterThan, types_1.OutputType.Boolean],
        _f[types_1.FloatOperatorName.Floor] = [types_1.OperatorCode.FloatFloor, types_1.OutputType.Integer],
        _f[types_1.FloatOperatorName.LessThan] = [types_1.OperatorCode.FloatLessThan, types_1.OutputType.Boolean],
        _f[types_1.FloatOperatorName.Modulo] = [types_1.OperatorCode.FloatModulo, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Multiply] = [types_1.OperatorCode.FloatMultiply, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Negate] = [types_1.OperatorCode.FloatNegate, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Power] = [types_1.OperatorCode.FloatPower, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Reciprocal] = [types_1.OperatorCode.FloatReciprocal, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Round] = [types_1.OperatorCode.FloatRound, types_1.OutputType.Integer],
        _f[types_1.FloatOperatorName.Sum] = [types_1.OperatorCode.Floatsum, types_1.OutputType.Float],
        _f[types_1.FloatOperatorName.Truncate] = [types_1.OperatorCode.FloatTruncate, types_1.OutputType.Integer],
        _f),
    _a[types_1.Type.Map] = (_g = {},
        _g[types_1.MapOperatorName.Entries] = [types_1.OperatorCode.MapEntries, types_1.OutputType.Bytes],
        _g[types_1.MapOperatorName.GetArray] = [types_1.OperatorCode.MapGetArray, types_1.OutputType.Array],
        _g[types_1.MapOperatorName.GetBoolean] = [types_1.OperatorCode.MapGetBoolean, types_1.OutputType.Boolean],
        _g[types_1.MapOperatorName.GetBytes] = [types_1.OperatorCode.MapGetBytes, types_1.OutputType.Bytes],
        _g[types_1.MapOperatorName.GetFloat] = [types_1.OperatorCode.MapGetFloat, types_1.OutputType.Float],
        _g[types_1.MapOperatorName.GetInteger] = [types_1.OperatorCode.MapGetInteger, types_1.OutputType.Integer],
        _g[types_1.MapOperatorName.GetMap] = [types_1.OperatorCode.MapGetMap, types_1.OutputType.Map],
        _g[types_1.MapOperatorName.GetString] = [types_1.OperatorCode.MapGetString, types_1.OutputType.String],
        _g[types_1.MapOperatorName.Keys] = [types_1.OperatorCode.MapKeys, types_1.OutputType.ArrayString],
        _g[types_1.MapOperatorName.valuesArray] = [types_1.OperatorCode.MapValuesArray, types_1.OutputType.ArrayArray],
        _g[types_1.MapOperatorName.valuesBoolean] = [types_1.OperatorCode.MapValuesBoolean, types_1.OutputType.ArrayBoolean],
        _g[types_1.MapOperatorName.valuesBytes] = [types_1.OperatorCode.MapValuesBytes, types_1.OutputType.ArrayBytes],
        _g[types_1.MapOperatorName.valuesFloat] = [types_1.OperatorCode.MapValuesFloat, types_1.OutputType.ArrayFloat],
        _g[types_1.MapOperatorName.valuesInteger] = [types_1.OperatorCode.MapValuesInteger, types_1.OutputType.ArrayInteger],
        _g[types_1.MapOperatorName.valuesMap] = [types_1.OperatorCode.MapValuesMap, types_1.OutputType.ArrayMap],
        _g[types_1.MapOperatorName.valuesString] = [types_1.OperatorCode.MapValuesString, types_1.OutputType.ArrayString],
        _g),
    _a[types_1.Type.String] = (_h = {},
        _h[types_1.StringOperatorName.AsBoolean] = [types_1.OperatorCode.StringAsBoolean, types_1.OutputType.Boolean],
        _h[types_1.StringOperatorName.AsBytes] = [types_1.OperatorCode.StringAsBytes, types_1.OutputType.Bytes],
        _h[types_1.StringOperatorName.AsFloat] = [types_1.OperatorCode.StringAsFloat, types_1.OutputType.Float],
        _h[types_1.StringOperatorName.AsInteger] = [types_1.OperatorCode.StringAsInteger, types_1.OutputType.Integer],
        _h[types_1.StringOperatorName.Length] = [types_1.OperatorCode.StringLength, types_1.OutputType.Integer],
        _h[types_1.StringOperatorName.Match] = [types_1.OperatorCode.StringMatch, types_1.OutputType.MatchOutput],
        _h[types_1.StringOperatorName.ParseJsonArray] = [types_1.OperatorCode.StringParseJsonArray, types_1.OutputType.Array],
        _h[types_1.StringOperatorName.ParseJsonBoolean] = [
            types_1.OperatorCode.StringParseJsonBoolean,
            types_1.OutputType.Boolean,
        ],
        _h[types_1.StringOperatorName.ParseJsonFloat] = [types_1.OperatorCode.StringParseJsonFloat, types_1.OutputType.Float],
        _h[types_1.StringOperatorName.ParseJsonInteger] = [
            types_1.OperatorCode.StringParseJsonInteger,
            types_1.OutputType.Integer,
        ],
        _h[types_1.StringOperatorName.ParseJsonMap] = [types_1.OperatorCode.StringParseJsonMap, types_1.OutputType.Map],
        _h[types_1.StringOperatorName.ParseJsonString] = [types_1.OperatorCode.StringParseJsonString, types_1.OutputType.String],
        _h[types_1.StringOperatorName.ParseXml] = [types_1.OperatorCode.StringParseXML, types_1.OutputType.Map],
        _h[types_1.StringOperatorName.ToLowerCase] = [types_1.OperatorCode.StringToLowerCase, types_1.OutputType.String],
        _h[types_1.StringOperatorName.ToUpperCase] = [types_1.OperatorCode.StringToUpperCase, types_1.OutputType.String],
        _h),
    _a[types_1.Type.Result] = (_j = {},
        _j[types_1.ResultOperatorName.Get] = [types_1.OperatorCode.ResultGet, types_1.OutputType.Inner],
        _j[types_1.ResultOperatorName.GetOr] = [types_1.OperatorCode.ResultGetOr, types_1.OutputType.Inner],
        _j[types_1.ResultOperatorName.IsOk] = [types_1.OperatorCode.ResultIsOk, types_1.OutputType.Boolean],
        _j),
    _a);
exports.operatorInfos = (_k = {},
    _k[types_1.OperatorCode.ArrayCount] = {
        type: types_1.Type.Array,
        name: 'count',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.ArrayFilter] = {
        type: types_1.Type.Array,
        name: 'filter',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Filter,
            },
        ],
        outputType: types_1.OutputType.Same,
    },
    _k[types_1.OperatorCode.ArrayFlatten] = {
        type: types_1.Type.Array,
        name: 'flatten',
        arguments: [
            {
                name: 'depth',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Inner,
    },
    _k[types_1.OperatorCode.ArrayGetArray] = {
        type: types_1.Type.Array,
        name: 'get_array',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Array,
    },
    _k[types_1.OperatorCode.ArrayGetBoolean] = {
        type: types_1.Type.Boolean,
        name: 'get_boolean',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.ArrayGetBytes] = {
        type: types_1.Type.Array,
        name: 'get_bytes',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Bytes,
    },
    _k[types_1.OperatorCode.ArrayGetInteger] = {
        type: types_1.Type.Array,
        name: 'get_integer',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.ArrayGetFloat] = {
        type: types_1.Type.Array,
        name: 'get_float',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.ArrayGetMap] = {
        type: types_1.Type.Array,
        name: 'get_map',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Map,
    },
    _k[types_1.OperatorCode.ArrayGetResult] = {
        type: types_1.Type.Array,
        name: 'get_result',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Result,
    },
    _k[types_1.OperatorCode.ArrayGetString] = {
        type: types_1.Type.Array,
        name: 'get_string',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.ArrayMap] = {
        type: types_1.Type.Array,
        name: 'map',
        arguments: [
            {
                name: 'script',
                optional: false,
                type: types_1.MirArgumentKind.Mapper,
            },
        ],
        outputType: types_1.OutputType.SubscriptOutput,
    },
    _k[types_1.OperatorCode.ArrayReduce] = {
        type: types_1.Type.Array,
        name: 'reduce',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Reducer,
            },
        ],
        outputType: types_1.OutputType.Inner,
    },
    _k[types_1.OperatorCode.ArraySome] = {
        type: types_1.Type.Array,
        name: 'some',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Filter,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.ArraySort] = {
        type: types_1.Type.Array,
        name: 'sort',
        arguments: [
            {
                name: 'mapFunction',
                optional: false,
                type: types_1.MirArgumentKind.Mapper,
            },
            {
                name: 'ascending',
                optional: false,
                type: types_1.MirArgumentKind.Boolean,
            },
        ],
        outputType: types_1.OutputType.Same,
    },
    _k[types_1.OperatorCode.ArrayTake] = {
        type: types_1.Type.Array,
        name: 'take',
        arguments: [
            {
                name: 'min',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
            {
                name: 'max',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Same,
    },
    _k[types_1.OperatorCode.BooleanMatch] = {
        type: types_1.Type.Boolean,
        name: 'match',
        arguments: [
            {
                name: 'categories',
                optional: false,
                type: types_1.MirArgumentKind.Map,
            },
            {
                name: 'default',
                optional: false,
                type: types_1.MirArgumentKind.Inner,
            },
        ],
        outputType: types_1.OutputType.MatchOutput,
    },
    _k[types_1.OperatorCode.BooleanNegate] = {
        type: types_1.Type.Boolean,
        name: 'negate',
        arguments: [],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.BytesAsString] = {
        type: types_1.Type.Bytes,
        name: 'asString',
        arguments: [],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.BytesHash] = {
        type: types_1.Type.Bytes,
        name: 'hash',
        arguments: [],
        outputType: types_1.OutputType.Bytes,
    },
    _k[types_1.OperatorCode.IntegerAbsolute] = {
        type: types_1.Type.Integer,
        name: 'absolute',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.IntegerAsFloat] = {
        type: types_1.Type.Integer,
        name: 'asFloat',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.IntegerAsString] = {
        type: types_1.Type.Integer,
        name: 'asString',
        arguments: [
            {
                name: 'base',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.IntegerGreaterThan] = {
        type: types_1.Type.Integer,
        name: 'greaterThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.IntegerLessThan] = {
        type: types_1.Type.Integer,
        name: 'lessThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.IntegerMatch] = {
        type: types_1.Type.Integer,
        name: 'match',
        arguments: [],
        outputType: types_1.OutputType.MatchOutput,
    },
    _k[types_1.OperatorCode.IntegerModulo] = {
        type: types_1.Type.Integer,
        name: 'modulo',
        arguments: [
            {
                name: 'modulus',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.IntegerMultiply] = {
        type: types_1.Type.Integer,
        name: 'multiply',
        arguments: [
            {
                name: 'factor',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.IntegerNegate] = {
        type: types_1.Type.Integer,
        name: 'negate',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.IntegerPower] = {
        type: types_1.Type.Integer,
        name: 'power',
        arguments: [
            {
                name: 'exponent',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.IntegerReciprocal] = {
        type: types_1.Type.Integer,
        name: 'reciprocal',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.IntegerSum] = {
        type: types_1.Type.Integer,
        name: 'sum',
        arguments: [
            {
                name: 'addend',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.FloatAbsolute] = {
        type: types_1.Type.Float,
        name: 'absolute',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatAsString] = {
        type: types_1.Type.Float,
        name: 'asString',
        arguments: [
            {
                name: 'decimals',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.FloatCeiling] = {
        type: types_1.Type.Float,
        name: 'ceiling',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.FloatGraterThan] = {
        type: types_1.Type.Float,
        name: 'greaterThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.FloatFloor] = {
        type: types_1.Type.Float,
        name: 'floor',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatLessThan] = {
        type: types_1.Type.Float,
        name: 'lessThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.FloatModulo] = {
        type: types_1.Type.Float,
        name: 'modulo',
        arguments: [
            {
                name: 'modulus',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatMultiply] = {
        type: types_1.Type.Float,
        name: 'multiply',
        arguments: [
            {
                name: 'factor',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatNegate] = {
        type: types_1.Type.Float,
        name: 'negate',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatPower] = {
        type: types_1.Type.Float,
        name: 'power',
        arguments: [
            {
                name: 'exponent',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatReciprocal] = {
        type: types_1.Type.Float,
        name: 'reciprocal',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatRound] = {
        type: types_1.Type.Float,
        name: 'round',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.Floatsum] = {
        type: types_1.Type.Float,
        name: 'sum',
        arguments: [
            {
                name: 'addend',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.FloatTruncate] = {
        type: types_1.Type.Float,
        name: 'truncate',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.MapEntries] = {
        type: types_1.Type.Map,
        name: 'entries',
        arguments: [],
        outputType: types_1.OutputType.Array,
    },
    _k[types_1.OperatorCode.MapGetArray] = {
        type: types_1.Type.Map,
        name: 'get_array',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Array,
    },
    _k[types_1.OperatorCode.MapGetBoolean] = {
        type: types_1.Type.Map,
        name: 'get_boolean',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.MapGetBytes] = {
        type: types_1.Type.Map,
        name: 'get_bytes',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Bytes,
    },
    _k[types_1.OperatorCode.MapGetInteger] = {
        type: types_1.Type.Map,
        name: 'get_integer',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.MapGetFloat] = {
        type: types_1.Type.Map,
        name: 'get_float',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.MapGetMap] = {
        type: types_1.Type.Map,
        name: 'get_map',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.Map,
    },
    _k[types_1.OperatorCode.MapGetString] = {
        type: types_1.Type.Map,
        name: 'get_string',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.MapKeys] = {
        type: types_1.Type.Map,
        name: 'keys',
        arguments: [],
        outputType: types_1.OutputType.ArrayString,
    },
    _k[types_1.OperatorCode.MapValuesArray] = {
        type: types_1.Type.Map,
        name: 'values_array',
        arguments: [],
        outputType: types_1.OutputType.ArrayArray,
    },
    _k[types_1.OperatorCode.MapValuesBoolean] = {
        type: types_1.Type.Map,
        name: 'values_boolean',
        arguments: [],
        outputType: types_1.OutputType.ArrayBoolean,
    },
    _k[types_1.OperatorCode.MapValuesBytes] = {
        type: types_1.Type.Map,
        name: 'values_bytes',
        arguments: [],
        outputType: types_1.OutputType.ArrayBytes,
    },
    _k[types_1.OperatorCode.MapValuesInteger] = {
        type: types_1.Type.Map,
        name: 'values_integer',
        arguments: [],
        outputType: types_1.OutputType.ArrayInteger,
    },
    _k[types_1.OperatorCode.MapValuesFloat] = {
        type: types_1.Type.Map,
        name: 'values_float',
        arguments: [],
        outputType: types_1.OutputType.ArrayFloat,
    },
    _k[types_1.OperatorCode.MapValuesMap] = {
        type: types_1.Type.Map,
        name: 'values_map',
        arguments: [],
        outputType: types_1.OutputType.ArrayMap,
    },
    _k[types_1.OperatorCode.MapValuesString] = {
        type: types_1.Type.Map,
        name: 'values_string',
        arguments: [],
        outputType: types_1.OutputType.ArrayString,
    },
    _k[types_1.OperatorCode.ResultGet] = {
        type: types_1.Type.Result,
        name: 'get',
        arguments: [],
        outputType: types_1.OutputType.Inner,
    },
    _k[types_1.OperatorCode.ResultGetOr] = {
        type: types_1.Type.Result,
        name: 'getOr',
        arguments: [
            {
                name: 'default',
                optional: false,
                type: types_1.MirArgumentKind.Inner,
            },
        ],
        outputType: types_1.OutputType.Inner,
    },
    _k[types_1.OperatorCode.ResultIsOk] = {
        type: types_1.Type.Result,
        name: 'isOk',
        arguments: [],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.StringAsBoolean] = {
        type: types_1.Type.String,
        name: 'asBoolean',
        arguments: [],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.StringAsBytes] = {
        type: types_1.Type.String,
        name: 'asBytes',
        arguments: [],
        outputType: types_1.OutputType.Bytes,
    },
    _k[types_1.OperatorCode.StringAsFloat] = {
        type: types_1.Type.String,
        name: 'asFloat',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.StringAsInteger] = {
        type: types_1.Type.String,
        name: 'asInteger',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.StringLength] = {
        type: types_1.Type.String,
        name: 'length',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.StringMatch] = {
        type: types_1.Type.String,
        name: 'match',
        arguments: [],
        outputType: types_1.OutputType.MatchOutput,
    },
    _k[types_1.OperatorCode.StringParseJsonArray] = {
        type: types_1.Type.String,
        name: 'parseJson_array',
        arguments: [],
        outputType: types_1.OutputType.Array,
    },
    _k[types_1.OperatorCode.StringParseJsonBoolean] = {
        type: types_1.Type.String,
        name: 'parseJson_boolean',
        arguments: [],
        outputType: types_1.OutputType.Boolean,
    },
    _k[types_1.OperatorCode.StringParseJsonInteger] = {
        type: types_1.Type.String,
        name: 'parseJson_integer',
        arguments: [],
        outputType: types_1.OutputType.Integer,
    },
    _k[types_1.OperatorCode.StringParseJsonFloat] = {
        type: types_1.Type.String,
        name: 'parseJson_float',
        arguments: [],
        outputType: types_1.OutputType.Float,
    },
    _k[types_1.OperatorCode.StringParseJsonMap] = {
        type: types_1.Type.String,
        name: 'parseJson_map',
        arguments: [],
        outputType: types_1.OutputType.Map,
    },
    _k[types_1.OperatorCode.StringParseJsonString] = {
        type: types_1.Type.String,
        name: 'parseJson_string',
        arguments: [],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.StringParseXML] = {
        type: types_1.Type.String,
        name: 'parseXml',
        arguments: [],
        outputType: types_1.OutputType.Map,
    },
    _k[types_1.OperatorCode.StringToLowerCase] = {
        type: types_1.Type.String,
        name: 'toLowerCase',
        arguments: [],
        outputType: types_1.OutputType.String,
    },
    _k[types_1.OperatorCode.StringToUpperCase] = {
        type: types_1.Type.String,
        name: 'toUpperCase',
        arguments: [],
        outputType: types_1.OutputType.String,
    },
    _k);
var Cache = /** @class */ (function () {
    function Cache() {
        this.counter = 0;
        this.cache = {};
    }
    Cache.prototype.getLastIndex = function () {
        return this.counter + 1;
    };
    Cache.prototype.get = function (cacheId) {
        return this.cache[cacheId];
    };
    Cache.prototype.insert = function (item) {
        this.cache[++this.counter] = item;
        return { id: this.counter };
    };
    Cache.prototype.set = function (id, item) {
        this.cache[id] = item;
    };
    return Cache;
}());
exports.Cache = Cache;
function generateOption(label, outputType) {
    return {
        hierarchicalType: 'operatorOption',
        label: label,
        markupType: 'option',
        outputType: outputType,
    };
}
exports.primitiveMarkupOptions = {
    array: Object.entries(exports.typeSystem.Array).map(function (x) {
        return generateOption(types_1.OperatorCode[[1][0]], x[1][1]);
    }),
    arrayBoolean: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayBoolean' },
        { label: 'ArrayFlatten', outputType: 'arrayBoolean' },
        { label: 'ArrayGetArray', outputType: 'arrayBoolean' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'boolean' },
        { label: 'ArraySome', outputType: 'arrayBoolean' },
        { label: 'ArraySort', outputType: 'arrayBoolean' },
        { label: 'ArrayTake', outputType: 'arrayBoolean' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayArray: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayArray' },
        { label: 'ArrayFlatten', outputType: 'arrayArray' },
        { label: 'ArrayGetArray', outputType: 'arrayArray' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: '' },
        { label: 'ArraySome', outputType: 'arrayArray' },
        { label: 'ArraySort', outputType: 'arrayArray' },
        { label: 'ArrayTake', outputType: 'arrayArray' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayBytes: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayBytes' },
        { label: 'ArrayFlatten', outputType: 'arrayBytes' },
        { label: 'ArrayGetArray', outputType: 'arrayBytes' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'bytes' },
        { label: 'ArraySome', outputType: 'arrayBytes' },
        { label: 'ArraySort', outputType: 'arrayBytes' },
        { label: 'ArrayTake', outputType: 'arrayBytes' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayFloat: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayFloat' },
        { label: 'ArrayFlatten', outputType: 'arrayFloat' },
        { label: 'ArrayGetArray', outputType: 'arrayFloat' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'float' },
        { label: 'ArraySome', outputType: 'arrayFloat' },
        { label: 'ArraySort', outputType: 'arrayFloat' },
        { label: 'ArrayTake', outputType: 'arrayFloat' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayInteger: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayInteger' },
        { label: 'ArrayFlatten', outputType: 'arrayInteger' },
        { label: 'ArrayGetArray', outputType: 'arrayInteger' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'integer' },
        { label: 'ArraySome', outputType: 'arrayInteger' },
        { label: 'ArraySort', outputType: 'arrayInteger' },
        { label: 'ArrayTake', outputType: 'arrayInteger' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayMap: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayMap' },
        { label: 'ArrayFlatten', outputType: 'arrayMap' },
        { label: 'ArrayGetArray', outputType: 'arrayMap' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'map' },
        { label: 'ArraySome', outputType: 'arrayMap' },
        { label: 'ArraySort', outputType: 'arrayMap' },
        { label: 'ArrayTake', outputType: 'arrayMap' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayResult: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayResult' },
        { label: 'ArrayFlatten', outputType: 'arrayResult' },
        { label: 'ArrayGetArray', outputType: 'arrayResult' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'result' },
        { label: 'ArraySome', outputType: 'arrayResult' },
        { label: 'ArraySort', outputType: 'arrayResult' },
        { label: 'ArrayTake', outputType: 'arrayResult' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    arrayString: [
        { label: 'ArrayCount', outputType: 'integer' },
        { label: 'ArrayFilter', outputType: 'arrayString' },
        { label: 'ArrayFlatten', outputType: 'arrayString' },
        { label: 'ArrayGetArray', outputType: 'arrayString' },
        { label: 'ArrayGetBoolean', outputType: 'boolean' },
        { label: 'ArrayGetBytes', outputType: 'bytes' },
        { label: 'ArrayGetString', outputType: 'string' },
        { label: 'ArrayMap', outputType: 'arrayMap' },
        { label: 'ArrayReduce', outputType: 'string' },
        { label: 'ArraySome', outputType: 'arrayString' },
        { label: 'ArraySort', outputType: 'arrayString' },
        { label: 'ArrayTake', outputType: 'arrayString' },
    ].map(function (x) {
        return generateOption(x.label, x.outputType);
    }),
    boolean: Object.entries(exports.typeSystem.Boolean).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    bytes: Object.entries(exports.typeSystem.Bytes).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    filterOutput: Object.entries(exports.typeSystem.Array).map(function (x) {
        return generateOption(types_1.OperatorCode[[1][0]], x[1][1]);
    }),
    float: Object.entries(exports.typeSystem.Float).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    matchOutput: null,
    reducerOutput: null,
    result: Object.entries(exports.typeSystem.Result).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    string: Object.entries(exports.typeSystem.String).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    subscriptOutput: null,
    map: Object.entries(exports.typeSystem.Map).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
    integer: Object.entries(exports.typeSystem.Integer).map(function (x) {
        return generateOption(types_1.OperatorCode[x[1][0]], x[1][1]);
    }),
};
exports.markupOptions = {
    all: removeRepeated(__spread(exports.primitiveMarkupOptions.array, exports.primitiveMarkupOptions.arrayBoolean, exports.primitiveMarkupOptions.arrayArray, exports.primitiveMarkupOptions.arrayBytes, exports.primitiveMarkupOptions.arrayFloat, exports.primitiveMarkupOptions.arrayInteger, exports.primitiveMarkupOptions.arrayMap, exports.primitiveMarkupOptions.arrayResult, exports.primitiveMarkupOptions.arrayString, exports.primitiveMarkupOptions.boolean, exports.primitiveMarkupOptions.bytes, exports.primitiveMarkupOptions.filterOutput, exports.primitiveMarkupOptions.float, exports.primitiveMarkupOptions.result, exports.primitiveMarkupOptions.string, exports.primitiveMarkupOptions.map, exports.primitiveMarkupOptions.integer)),
    array: __spread(exports.primitiveMarkupOptions.array),
    arrayArray: __spread(exports.primitiveMarkupOptions.arrayArray),
    arrayBoolean: __spread(exports.primitiveMarkupOptions.arrayBoolean),
    arrayBytes: __spread(exports.primitiveMarkupOptions.arrayBytes),
    arrayFloat: __spread(exports.primitiveMarkupOptions.arrayFloat),
    arrayInteger: __spread(exports.primitiveMarkupOptions.arrayInteger),
    arrayMap: __spread(exports.primitiveMarkupOptions.arrayMap),
    arrayResult: __spread(exports.primitiveMarkupOptions.arrayResult),
    arrayString: __spread(exports.primitiveMarkupOptions.arrayString),
    boolean: __spread(exports.primitiveMarkupOptions.boolean, exports.primitiveMarkupOptions.string),
    bytes: __spread(exports.primitiveMarkupOptions.bytes, exports.primitiveMarkupOptions.string),
    filterOutput: __spread(exports.primitiveMarkupOptions.filterOutput),
    float: __spread(exports.primitiveMarkupOptions.float, exports.primitiveMarkupOptions.string),
    integer: __spread(exports.primitiveMarkupOptions.integer, exports.primitiveMarkupOptions.float, exports.primitiveMarkupOptions.string),
    map: __spread(exports.primitiveMarkupOptions.map),
    matchOutput: null,
    reducerOutput: null,
    result: __spread(exports.primitiveMarkupOptions.result),
    string: __spread(exports.primitiveMarkupOptions.string),
    subscriptOutput: null,
};
function removeRepeated(array) {
    return array.filter(function (item, index, self) { return index === self.indexOf(item); });
}
