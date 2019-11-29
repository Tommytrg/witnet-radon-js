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
export declare const primitiveMarkupOptions: {
    array: void[];
    arrayBoolean: never[];
    arrayArray: never[];
    arrayBytes: never[];
    arrayFloat: never[];
    arrayInteger: never[];
    arrayMap: never[];
    arrayResult: never[];
    arrayString: never[];
    boolean: void[];
    bytes: void[];
    filterOutput: never[];
    float: void[];
    matchOutput: never[];
    reducerOutput: never[];
    result: void[];
    string: void[];
    subscriptOutput: never[];
    map: void[];
    integer: void[];
};
export declare const markupOptions: {
    array: void[];
    arrayArray: never[];
    arrayBoolean: never[];
    arrayBytes: never[];
    arrayFloat: never[];
    arrayInteger: never[];
    arrayMap: never[];
    arrayResult: never[];
    arrayString: never[];
    boolean: void[];
    bytes: void[];
    filterOutput: never[];
    float: void[];
    integer: void[];
    map: void[];
    matchOutput: never[];
    reducerOutput: never[];
    result: void[];
    string: void[];
    subscriptOutput: never[];
};
//# sourceMappingURL=structures.d.ts.map