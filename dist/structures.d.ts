import { TypeSystem, OperatorInfos, CacheRef } from './types';
export declare const typeSystem: TypeSystem;
export declare const operatorInfos: OperatorInfos;
export declare class Cache<T> {
    private counter;
    private cache;
    constructor();
    getLastIndex(): number;
    get(cacheId: number): T;
    insert(item: T): CacheRef;
    set(id: number, item: T): void;
}
//# sourceMappingURL=structures.d.ts.map