import { Markup, Mir, MirScript, MirOperator, OperatorInfo, MarkupSelect, OperatorCode, MirArgument, MarkupOption, MarkupSelectedOption, MarkupInput, FilterArgument, OutputType, Reducer, Filter, CacheRef, MarkupSource, MarkupScript, MarkupOperator, MarkupArgument, CachedMarkupSelectedOption, CachedArgument, CachedMarkup, CachedMarkupSelect, CachedMarkupScript, CachedMarkupSource, CachedMarkupOperator, OperatorName, ScriptCacheRef } from './types';
export declare class Radon {
    private cache;
    private cachedMarkup;
    private scriptCache;
    constructor(mir?: Mir);
    saveScriptInCache(script: CachedMarkupScript): ScriptCacheRef;
    addSource(): void;
    addOperator(scriptId: number): void;
    deleteSource(index: number): void;
    updateSource(url: string, index: number): void;
    updateMarkup(id: number, value: number | string | boolean): () => Markup;
    updateMarkupInput(id: number, cachedInput: MarkupInput, value: number | string | boolean): void;
    removeNextOperators(scriptId: number, idToRemove: number): void;
    updateMarkupSelect(id: number, cachedSelect: CachedMarkupSelect, value: OperatorName | Filter | Reducer): void;
    updateCacheItem(id: number, item: CachedMarkupSelectedOption | CachedArgument): void;
    wrapResultInCache(result: CachedMarkupSelectedOption | CachedArgument): CacheRef;
    unwrapResultFromCache(ref: CacheRef): CachedMarkupSelectedOption | MarkupInput | CachedMarkupSelect | MarkupSelect;
    mir2markup(mir: Mir): CachedMarkup;
    getMir(): Mir;
    getMarkup(): Markup;
    generateMarkupScript(script: MirScript, scriptId: number): CachedMarkupScript;
    generateMarkupOperator(operator: MirOperator, scriptId: number): CachedMarkupOperator;
    generateSelectedOption(operatorInfo: OperatorInfo, code: OperatorCode, args: Array<MirArgument> | null, scriptId: number): CachedMarkupSelectedOption;
    generateOperatorArguments(operatorInfo: OperatorInfo, args: Array<MirArgument>, scriptId: number): Array<CacheRef>;
    generateInputArgument(value: string | number | boolean): MarkupInput;
    generateFilterArgument(label: string, filter: FilterArgument, scriptId: number): CachedMarkupSelect;
    generateReducerArgument(label: string, reducer: Reducer, scriptId: number): CachedMarkupSelect;
    generateSelectedFilterArgument(filterArgument: FilterArgument): CachedMarkupSelectedOption;
    generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption;
    readScriptCache(id: number): number[];
    unwrapSource(source: CachedMarkupSource): MarkupSource;
    unwrapScript(script: Array<CacheRef>): MarkupScript;
    unwrapOperator(operator: CachedMarkupOperator, id: number): MarkupOperator;
    unwrapSelectedOption(selectedOption: CacheRef): MarkupSelectedOption;
    unwrapArgument(arg: CacheRef): MarkupArgument;
    findOutputType(code: OperatorCode): OutputType | Array<OutputType>;
    getMirOperatorInfo(operator: MirOperator): {
        code: OperatorCode;
        args: Array<MirArgument> | null;
    };
    generateMarkupOptions(operatorInfo: OperatorInfo, _code: OperatorCode, _args: Array<MirArgument> | null): Array<MarkupOption>;
}
//# sourceMappingURL=radon.d.ts.map