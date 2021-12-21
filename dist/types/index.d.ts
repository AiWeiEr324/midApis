import { IReporter, IData } from './interface';
import Db from './helpers/db';
export default class MidApis {
    _opt: IReporter;
    storage: Db;
    time?: number;
    constructor();
    init(): void;
    private preReporter;
    debug(mode: string): IData;
    addError(message: string, opt: IReporter, immediate?: boolean): void;
    private isTimeOut;
    private isMaxCache;
    private reporter;
}
