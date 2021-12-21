import { ICacheKey, IData, IObject } from '../interface';
declare abstract class StorageItem {
    data: Record<string, any>;
    arr: IData;
    _this: any;
    protected init(): void;
    protected getItem(key: ICacheKey): any;
    protected setItem(key: string, value: IData): void;
    protected removeItem(key: string): void;
    protected clear(): void;
}
export default class Db extends StorageItem {
    constructor();
    get(): IData;
    set(value: IObject): void;
    clearAll(): void;
}
export {};
