import { Markup, Mir, CachedMarkup } from './types';
export declare class Radon {
    private cache;
    private cachedMarkup;
    constructor(mir?: Mir);
    private wrapResultInCache;
    private unwrapResultFromCache;
    mir2markup(mir: Mir): CachedMarkup;
    getMir(): Mir;
    getMarkup(): Markup;
    private generateMarkupScript;
    private generateMarkupOperator;
    private generateSelectedOption;
    private generateOperatorArguments;
    private generateInputArgument;
    private generateFilterArgument;
    private generateReducerArgument;
    private generateSelectedFilterArgument;
    private generateSelectedReducerArgument;
    private unwrapSource;
    private unwrapScript;
    private unwrapOperator;
    private unwrapSelectedOption;
    private unwrapArgument;
}
//# sourceMappingURL=radon.d.ts.map