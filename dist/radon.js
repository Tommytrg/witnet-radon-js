"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var types_1 = require("./types");
var structures_1 = require("./structures");
var markup2mir_1 = require("./markup2mir");
var filterArgumentOptions = generateFilterArgumentOptions();
var reducerArgumentOptions = generateReducerArgumentOptions();
var Radon = /** @class */ (function () {
    function Radon(mir) {
        this.lasType = types_1.OutputType.Bytes;
        this.cachedMarkup = {
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
        };
        this.cache = new structures_1.Cache();
        this.cachedMarkup = mir ? this.mir2markup(mir) : this.cachedMarkup;
    }
    Radon.prototype.wrapResultInCache = function (result) {
        return this.cache.insert(result);
    };
    Radon.prototype.unwrapResultFromCache = function (ref) {
        return this.cache.get(ref.id);
    };
    Radon.prototype.mir2markup = function (mir) {
        var _this = this;
        var retrieveScript = mir.radRequest.retrieve.map(function (source) {
            var generatedMarkupScript = _this.generateMarkupScript(source.script);
            return {
                kind: source.kind,
                url: source.url,
                script: generatedMarkupScript,
            };
        });
        var aggregateScript = this.generateMarkupScript(mir.radRequest.aggregate);
        var tallyScript = this.generateMarkupScript(mir.radRequest.tally);
        var radRequest = {
            notBefore: mir.radRequest.notBefore,
            retrieve: retrieveScript,
            aggregate: aggregateScript,
            tally: tallyScript,
        };
        this.cachedMarkup = {
            name: mir.name,
            description: mir.description,
            radRequest: radRequest,
        };
        return this.cachedMarkup;
    };
    Radon.prototype.getMir = function () {
        return markup2mir_1.markup2mir(this.getMarkup());
    };
    Radon.prototype.getMarkup = function () {
        var _this = this;
        var cachedRadRequest = this.cachedMarkup.radRequest;
        var radRequest = {
            notBefore: cachedRadRequest.notBefore,
            retrieve: cachedRadRequest.retrieve.map(function (source) {
                return _this.unwrapSource(source);
            }),
            aggregate: this.unwrapScript(cachedRadRequest.aggregate),
            tally: this.unwrapScript(cachedRadRequest.tally),
        };
        return {
            description: this.cachedMarkup.description,
            name: this.cachedMarkup.name,
            radRequest: radRequest,
        };
    };
    Radon.prototype.generateMarkupScript = function (script) {
        var _this = this;
        var markupScript = script.map(function (operator) {
            return _this.wrapResultInCache(_this.generateMarkupOperator(operator));
        });
        return markupScript;
    };
    Radon.prototype.generateMarkupOperator = function (operator) {
        var _a = getMirOperatorInfo(operator), code = _a.code, args = _a.args;
        var operatorInfo = structures_1.operatorInfos[code];
        var outputType = findOutputType(code);
        var options = generateMarkupOptions(this.lasType);
        var selected = this.generateSelectedOption(operatorInfo, code, args);
        var markupOperator = {
            id: 0,
            scriptId: 0,
            markupType: types_1.MarkupType.Select,
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            outputType: outputType,
            selected: this.wrapResultInCache(selected),
            options: options,
        };
        this.lasType = selected.outputType;
        return markupOperator;
    };
    Radon.prototype.generateSelectedOption = function (operatorInfo, code, args) {
        var outputType = findOutputType(code);
        var markupSelectedOption = {
            arguments: args && args.length ? this.generateOperatorArguments(operatorInfo, args) : [],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            label: operatorInfo.name,
            markupType: types_1.MarkupType.Option,
            outputType: outputType,
        };
        return markupSelectedOption;
    };
    Radon.prototype.generateOperatorArguments = function (operatorInfo, args) {
        var _this = this;
        var operatorArguments = args.map(function (argument, index) {
            var argumentInfo = operatorInfo.arguments[index];
            switch (argumentInfo.type) {
                case types_1.MirArgumentKind.Array:
                case types_1.MirArgumentKind.Boolean:
                case types_1.MirArgumentKind.Bytes:
                case types_1.MirArgumentKind.Mapper:
                case types_1.MirArgumentKind.Passthrough:
                case types_1.MirArgumentKind.Result:
                case types_1.MirArgumentKind.Float:
                case types_1.MirArgumentKind.Inner:
                case types_1.MirArgumentKind.Integer:
                case types_1.MirArgumentKind.Map:
                case types_1.MirArgumentKind.String:
                    return _this.wrapResultInCache(_this.generateInputArgument(argumentInfo.name, argument));
                case types_1.MirArgumentKind.Filter:
                    return _this.wrapResultInCache(_this.generateFilterArgument(argument));
                case types_1.MirArgumentKind.Reducer:
                    return _this.wrapResultInCache(_this.generateReducerArgument(argumentInfo.name, argument));
            }
        });
        return operatorArguments;
    };
    Radon.prototype.generateInputArgument = function (label, value) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            label: label,
            markupType: types_1.MarkupType.Input,
            value: value,
        };
    };
    Radon.prototype.generateFilterArgument = function (filter) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: filterArgumentOptions,
            scriptId: 0,
            selected: this.wrapResultInCache(this.generateSelectedFilterArgument(filter)),
        };
    };
    Radon.prototype.generateReducerArgument = function (label, reducer) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: reducerArgumentOptions,
            outputType: types_1.OutputType.Bytes,
            scriptId: 0,
            label: label,
            selected: this.wrapResultInCache(this.generateSelectedReducerArgument(reducer)),
        };
    };
    Radon.prototype.generateSelectedFilterArgument = function (filterArgument) {
        var filter = filterArgument[0];
        var argument = filterArgument[1];
        var selectedArgument = {
            arguments: [this.wrapResultInCache(this.generateInputArgument('by', argument))],
            label: types_1.Filter[filter],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
        return selectedArgument;
    };
    Radon.prototype.generateSelectedReducerArgument = function (reducer) {
        var selectedArgument = {
            arguments: [],
            label: types_1.Reducer[reducer],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
        return selectedArgument;
    };
    Radon.prototype.unwrapSource = function (source) {
        var markupSource = {
            kind: source.kind,
            url: source.url,
            script: this.unwrapScript(source.script),
        };
        return markupSource;
    };
    Radon.prototype.unwrapScript = function (script) {
        var _this = this;
        var markupScript = script.map(function (operatorRef) {
            var cachedOperator = _this.unwrapResultFromCache(operatorRef);
            var operator = _this.unwrapOperator(cachedOperator, operatorRef.id);
            return operator;
        });
        return markupScript;
    };
    Radon.prototype.unwrapOperator = function (operator, id) {
        var selected = this.unwrapSelectedOption(operator.selected);
        var markup = {
            hierarchicalType: operator.hierarchicalType,
            id: id,
            label: selected.label,
            markupType: operator.markupType,
            options: operator.options,
            outputType: operator.outputType,
            scriptId: operator.scriptId,
            selected: selected,
        };
        return markup;
    };
    Radon.prototype.unwrapSelectedOption = function (selectedOption) {
        var _this = this;
        var cachedSelectedOption = this.unwrapResultFromCache(selectedOption);
        var markup = {
            arguments: cachedSelectedOption.arguments.length
                ? cachedSelectedOption.arguments.map(function (argument) {
                    return _this.unwrapArgument(argument);
                })
                : [],
            hierarchicalType: cachedSelectedOption.hierarchicalType,
            label: cachedSelectedOption.label,
            markupType: cachedSelectedOption.markupType,
            outputType: cachedSelectedOption.outputType,
        };
        return markup;
    };
    Radon.prototype.unwrapArgument = function (arg) {
        var cachedArgument = this.unwrapResultFromCache(arg);
        switch (cachedArgument.markupType) {
            case types_1.MarkupType.Input:
                return {
                    hierarchicalType: cachedArgument.hierarchicalType,
                    id: arg.id,
                    label: cachedArgument.label,
                    markupType: cachedArgument.markupType,
                    value: cachedArgument.value,
                };
            case types_1.MarkupType.Select:
                var selected = this.unwrapSelectedOption(cachedArgument.selected);
                return {
                    hierarchicalType: cachedArgument.hierarchicalType,
                    id: arg.id,
                    label: selected.label,
                    markupType: cachedArgument.markupType,
                    options: cachedArgument.options,
                    outputType: cachedArgument.outputType,
                    scriptId: cachedArgument.scriptId,
                    selected: selected,
                };
        }
    };
    return Radon;
}());
exports.Radon = Radon;
function findOutputType(code) {
    var entry = Object.entries(structures_1.typeSystem).find(function (entry) {
        return Object.values(entry[1]).find(function (x) { return x[0] === code; });
    });
    var operatorEntry = Object.values(entry[1]).find(function (x) { return x[0] === code; });
    var outputType = operatorEntry[1];
    return outputType;
}
function getMirOperatorInfo(operator) {
    return Array.isArray(operator)
        ? {
            code: operator[0],
            args: operator.slice(1),
        }
        : {
            code: operator,
            args: null,
        };
}
function generateMarkupOptions(type) {
    return (structures_1.markupOptions[type] ? structures_1.markupOptions[type] : structures_1.markupOptions['all']);
}
// TODO: Call this function just at the beginning
function generateFilterArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Filter).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for pseudotypes
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
// TODO: Call this function just at the beginning
function generateReducerArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Reducer).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
