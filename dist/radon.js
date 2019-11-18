"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var types_1 = require("./types");
var structures_1 = require("./structures");
var markup2mir_1 = require("./markup2mir");
var filterArgumentOptions = generateFilterArgumentOptions();
var reducerArgumentOptions = generateReducerArgumentOptions();
// TODO: Create factory functions to remove code repetition
var Radon = /** @class */ (function () {
    function Radon(mir) {
        this.cache = new structures_1.Cache();
        this.scriptCache = new structures_1.Cache();
        var defaultRequest = {
            description: '',
            name: '',
            radRequest: {
                timelock: 0,
                retrieve: [
                    {
                        script: this.scriptCache.insert([]),
                        url: '',
                        kind: '',
                    },
                ],
                aggregate: this.scriptCache.insert([]),
                tally: this.scriptCache.insert([]),
            },
        };
        this.cachedMarkup = mir ? this.mir2markup(mir) : defaultRequest;
    }
    Radon.prototype.saveScriptInCache = function (script) {
        return this.scriptCache.insert(script.map(function (x) { return x.id; }));
    };
    Radon.prototype.addSource = function () {
        var scriptIndex = this.scriptCache.getLastIndex();
        var scripCachetRef = this.saveScriptInCache(this.generateMarkupScript([0x75], scriptIndex));
        this.cachedMarkup.radRequest.retrieve.push({
            script: scripCachetRef,
            url: '',
        });
    };
    Radon.prototype.addOperator = function (scriptId) {
        //last cached operator
        var cacheByScriptId = this.scriptCache.get(scriptId);
        //ref to cache
        var lastOperatorRef = cacheByScriptId[cacheByScriptId.length - 1];
        //operator in chache as CachedMarkupOperator type
        var cachedSelected = this.unwrapResultFromCache({
            id: lastOperatorRef,
        });
        //output type
        var outputType = Array.isArray(cachedSelected.outputType)
            ? cachedSelected.outputType[0]
            : cachedSelected.outputType;
        //Need Markup Select Structure and look into that to create operator
        var mirOperator = 0x70;
        if (outputType === types_1.OutputType.Boolean) {
            mirOperator = [0x10, '', ''];
        }
        else if (outputType === types_1.OutputType.Integer) {
            mirOperator = 0x20;
        }
        else if (outputType === types_1.OutputType.Float) {
            mirOperator = 0x30;
        }
        else if (outputType === types_1.OutputType.String) {
            mirOperator = 0x40;
        }
        else if (outputType === types_1.OutputType.Array) {
            mirOperator = 0x50;
        }
        else if (outputType === types_1.OutputType.Map) {
            mirOperator = 0x60;
        }
        else if (outputType === types_1.OutputType.Bytes) {
            mirOperator = 0x70;
        }
        else if (outputType === types_1.OutputType.Result) {
            mirOperator = 0x80;
        }
        else if (outputType === types_1.OutputType.Inner) {
            mirOperator = 0x70;
        }
        else if (outputType === types_1.OutputType.Argument) {
            mirOperator = 0x70;
        }
        else if (outputType === types_1.OutputType.Passthrough) {
            mirOperator = 0x70;
        }
        //generate markup operator with operator
        //TODO: move this Cache logic to its own Cache method
        var cachedMarkupOperator = this.generateMarkupOperator(mirOperator, scriptId);
        var operatorRef = this.wrapResultInCache(cachedMarkupOperator);
        var newCacheScript = this.scriptCache.get(scriptId);
        newCacheScript.push(operatorRef.id);
        this.scriptCache.set(scriptId, newCacheScript);
    };
    Radon.prototype.deleteSource = function (index) {
        if (this.cachedMarkup.radRequest.retrieve[index]) {
            this.cachedMarkup.radRequest.retrieve.splice(index, 1);
        }
    };
    Radon.prototype.updateSource = function (url, index) {
        this.cachedMarkup.radRequest.retrieve[index].url = url;
    };
    Radon.prototype.updateMarkup = function (id, value) {
        var cachedItem = this.unwrapResultFromCache({ id: id });
        if (cachedItem.markupType === types_1.MarkupType.Input) {
            this.updateMarkupInput(id, cachedItem, value);
        }
        else {
            //TODO: remove casting. We sshould store only select instead of select|selected
            this.updateMarkupSelect(id, cachedItem, value);
        }
        return this.getMarkup;
    };
    Radon.prototype.updateMarkupInput = function (id, cachedInput, value) {
        var newCacheInput = __assign(__assign({}, cachedInput), { value: value });
        this.updateCacheItem(id, newCacheInput);
    };
    // TODO: cache scriptCache
    Radon.prototype.removeNextOperators = function (scriptId, idToRemove) {
        var index = this.scriptCache.get(scriptId).findIndex(function (x) { return x === idToRemove; });
        var newScript = this.scriptCache.get(scriptId).slice(0, index + 1);
        this.scriptCache.set(scriptId, newScript);
    };
    // TODO: split in two functions
    Radon.prototype.updateMarkupSelect = function (id, cachedSelect, value) {
        if (cachedSelect.hierarchicalType === types_1.MarkupHierarchicalType.Operator) {
            var operatorCode = markup2mir_1.findOperatorCode(value, cachedSelect.options.map(function (option) { return option.label; }));
            var operatorInfo = structures_1.operatorInfos[operatorCode];
            var defaultArgs = operatorInfo.arguments.map(function (arg) {
                return getDefaultMirArgument(arg);
            });
            var newSelected = this.generateSelectedOption(operatorInfo, operatorCode, defaultArgs, cachedSelect.scriptId);
            var newCacheSelect = __assign(__assign({}, cachedSelect), { outputType: newSelected.outputType });
            this.updateCacheItem(id, newCacheSelect);
            //TODO: only cache select indstread of select and selected
            this.updateCacheItem(cachedSelect.selected.id, newSelected);
            var oldOutputType = cachedSelect.outputType;
            var newOutputType = newSelected.outputType;
            if (newOutputType !== oldOutputType) {
                this.removeNextOperators(cachedSelect.scriptId, id);
            }
        }
        else {
            var newCacheSelect = __assign(__assign({}, cachedSelect), { label: value });
            var oldSelected = this.unwrapResultFromCache({
                id: id,
            });
            var newSelected = __assign(__assign({}, oldSelected), { label: value });
            this.updateCacheItem(id, newCacheSelect);
            //TODO: only cache select indstread of select and selected
            this.updateCacheItem(cachedSelect.selected.id, newSelected);
        }
    };
    Radon.prototype.updateCacheItem = function (id, item) {
        return this.cache.set(id, item);
    };
    Radon.prototype.wrapResultInCache = function (result) {
        return this.cache.insert(result);
    };
    Radon.prototype.unwrapResultFromCache = function (ref) {
        return this.cache.get(ref.id);
    };
    Radon.prototype.mir2markup = function (mir) {
        var _this = this;
        var aggregateScript = this.saveScriptInCache(this.generateMarkupScript(mir.radRequest.aggregate, this.scriptCache.getLastIndex()));
        var tallyScript = this.saveScriptInCache(this.generateMarkupScript(mir.radRequest.tally, this.scriptCache.getLastIndex()));
        var radRequest = {
            timelock: mir.radRequest.timelock,
            retrieve: mir.radRequest.retrieve.map(function (source) {
                var generatedMarkupScript = _this.saveScriptInCache(_this.generateMarkupScript(source.script, _this.scriptCache.getLastIndex()));
                return {
                    url: source.url,
                    script: generatedMarkupScript,
                };
            }),
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
            timelock: cachedRadRequest.timelock,
            retrieve: cachedRadRequest.retrieve.map(function (source) { return _this.unwrapSource(source); }),
            aggregate: this.unwrapScript(this.scriptCache.get(cachedRadRequest.aggregate.id).map(function (id) { return ({ id: id }); })),
            tally: this.unwrapScript(this.scriptCache.get(cachedRadRequest.tally.id).map(function (id) { return ({ id: id }); })),
        };
        return {
            description: this.cachedMarkup.description,
            name: this.cachedMarkup.name,
            radRequest: radRequest,
        };
    };
    Radon.prototype.generateMarkupScript = function (script, scriptId) {
        var _this = this;
        var markupScript = script.map(function (operator) {
            return _this.wrapResultInCache(_this.generateMarkupOperator(operator, scriptId));
        });
        return markupScript;
    };
    Radon.prototype.generateMarkupOperator = function (operator, scriptId) {
        var _a = this.getMirOperatorInfo(operator), code = _a.code, args = _a.args;
        var operatorInfo = structures_1.operatorInfos[code];
        var outputType = this.findOutputType(code);
        var markupOperator = {
            id: 0,
            scriptId: scriptId,
            markupType: types_1.MarkupType.Select,
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            outputType: outputType,
            selected: this.wrapResultInCache(this.generateSelectedOption(operatorInfo, code, args, scriptId)),
            options: this.generateMarkupOptions(operatorInfo, code, args),
        };
        return markupOperator;
    };
    Radon.prototype.generateSelectedOption = function (operatorInfo, code, args, scriptId) {
        var outputType = this.findOutputType(code);
        var markupSelectedOption = {
            arguments: args && args.length ? this.generateOperatorArguments(operatorInfo, args, scriptId) : [],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            label: operatorInfo.name,
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for pseudotypes
            outputType: outputType,
        };
        return markupSelectedOption;
    };
    Radon.prototype.generateOperatorArguments = function (operatorInfo, args, scriptId) {
        var _this = this;
        var operatorArguments = args.map(function (argument, index) {
            var argumentInfo = operatorInfo.arguments[index];
            switch (argumentInfo.type) {
                // TODO: Add support for pseudotypes
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
                    return _this.wrapResultInCache(_this.generateInputArgument(argument));
                case types_1.MirArgumentKind.Filter:
                    return _this.wrapResultInCache(_this.generateFilterArgument(argumentInfo.name, argument, scriptId));
                case types_1.MirArgumentKind.Reducer:
                    return _this.wrapResultInCache(_this.generateReducerArgument(argumentInfo.name, argument, scriptId));
            }
        });
        return operatorArguments;
    };
    Radon.prototype.generateInputArgument = function (value) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            label: 'by',
            markupType: types_1.MarkupType.Input,
            value: value,
        };
    };
    Radon.prototype.generateFilterArgument = function (label, filter, scriptId) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: filterArgumentOptions,
            scriptId: scriptId,
            label: label,
            selected: this.wrapResultInCache(this.generateSelectedFilterArgument(filter)),
        };
    };
    Radon.prototype.generateReducerArgument = function (label, reducer, scriptId) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: reducerArgumentOptions,
            outputType: types_1.OutputType.Bytes,
            scriptId: scriptId,
            label: label,
            selected: this.wrapResultInCache(this.generateSelectedReducerArgument(reducer)),
        };
    };
    Radon.prototype.generateSelectedFilterArgument = function (filterArgument) {
        var filter = filterArgument[0];
        var argument = filterArgument[1];
        var selectedArgument = {
            arguments: [this.wrapResultInCache(this.generateInputArgument(argument))],
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
    Radon.prototype.readScriptCache = function (id) {
        return this.scriptCache.get(id);
    };
    Radon.prototype.unwrapSource = function (source) {
        var markupSource = {
            kind: source.kind,
            url: source.url,
            script: this.unwrapScript(this.readScriptCache(source.script.id).map(function (id) { return ({ id: id }); })),
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
        var markup = {
            hierarchicalType: operator.hierarchicalType,
            id: id,
            label: operator.label,
            markupType: operator.markupType,
            options: operator.options,
            outputType: operator.outputType,
            scriptId: operator.scriptId,
            selected: this.unwrapSelectedOption(operator.selected),
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
                return {
                    hierarchicalType: cachedArgument.hierarchicalType,
                    id: arg.id,
                    label: cachedArgument.label,
                    markupType: cachedArgument.markupType,
                    options: cachedArgument.options,
                    outputType: cachedArgument.outputType,
                    scriptId: cachedArgument.scriptId,
                    selected: this.unwrapSelectedOption(cachedArgument.selected),
                };
        }
    };
    Radon.prototype.findOutputType = function (code) {
        var entry = Object.entries(structures_1.typeSystem).find(function (entry) {
            return Object.values(entry[1]).find(function (x) { return x[0] === code; });
        });
        var operatorEntry = Object.values(entry[1]).find(function (x) { return x[0] === code; });
        var outputType = operatorEntry[1];
        return outputType.length > 1 ? outputType : outputType[0];
    };
    Radon.prototype.getMirOperatorInfo = function (operator) {
        return Array.isArray(operator)
            ? {
                code: operator[0],
                args: operator.slice(1),
            }
            : {
                code: operator,
                args: null,
            };
    };
    Radon.prototype.generateMarkupOptions = function (operatorInfo, _code, _args) {
        var markupOptions = Object.entries(structures_1.typeSystem[operatorInfo.type]).map(function (x) {
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
                label: x[0],
                markupType: types_1.MarkupType.Option,
                // TODO: Add support for Pseudotypes
                outputType: x[1][1].length > 1 ? x[1][1] : x[1][1][0],
            };
        });
        return markupOptions;
    };
    return Radon;
}());
exports.Radon = Radon;
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
function getDefaultMirArgument(argumentInfo) {
    var argumentType = argumentInfo.type;
    if (argumentType === types_1.MirArgumentKind.Boolean) {
        return true;
    }
    else if (argumentType === types_1.MirArgumentKind.Integer || argumentType === types_1.MirArgumentKind.Bytes) {
        return 0;
    }
    else if (argumentType === types_1.MirArgumentKind.Filter) {
        return [0x00, 0];
    }
    else if (argumentType === types_1.MirArgumentKind.Reducer) {
        return 0x00;
    }
    else if (argumentType === types_1.MirArgumentKind.Float) {
        return 0.0;
    }
    else {
        return '';
    }
}
