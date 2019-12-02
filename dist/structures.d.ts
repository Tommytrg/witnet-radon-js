import { TypeSystem, OutputType, OperatorInfos, CacheRef } from './types';
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
    array: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayBoolean: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayArray: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayBytes: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayFloat: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayInteger: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayMap: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayResult: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayString: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    boolean: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    bytes: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    filterOutput: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    float: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    matchOutput: null;
    reducerOutput: null;
    result: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    string: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    subscriptOutput: null;
    map: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    integer: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
};
export declare const markupOptions: {
    [key: string]: Array<any> | null;
};
//# sourceMappingURL=structures.d.ts.map