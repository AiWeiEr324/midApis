/* MidApis version ' + 1.0.0 */
'use strict';

const isBrowser = () => {
    return typeof window !== 'undefined';
};
const isArray = Array.isArray;

const CACHE_KEY = 'apis_data';
class StorageItem {
    init() {
        this.data = Object.create(null);
        if (isBrowser()) {
            this._this = window.localStorage;
        }
        else {
            this._this = null;
        }
    }
    getItem(key) {
        if (key) {
            return this._this ? this._this.getItem(key) : this.data[key];
        }
        else {
            return this.data;
        }
    }
    setItem(key, value) {
        this._this ? this._this.setItem(key, value) : this.data[key] = value;
    }
    removeItem(key) {
        this._this ? this._this.removeItem(key) : delete this.data[key];
    }
    clear() {
        this._this ? this._this.clear() : this.init();
    }
}
class Db extends StorageItem {
    constructor() {
        super();
        this.init();
        this.get();
    }
    get() {
        this.arr = this.getItem(CACHE_KEY) || [];
        return this.arr;
    }
    set(value) {
        this.arr.push(value);
        this.setItem(CACHE_KEY, this.arr);
    }
    clearAll() {
        this.removeItem(CACHE_KEY);
    }
}

const MAX_SIZE = 100;
const CACHE_TIME = 60;
const ERROR = 'error';
const JS_ERROR = 'jsError';

/**
 * 异常数据模型
 *
 * @param {string} project - 错误所在项目
 * @param {string} pageUrl - 错误聚合页面地址
 * @param {string} realUrl - 错误真实地址
 * @param {string} [resourceUrl] - 错误资源地址
 * @param {string} category - 错误类型jsError, resourceError, ajaxError
 * @param {string} sec_category - 错误名称，用户错误聚合
 * @param {string} level - 错误程度, 默认error, 分类info, debug, error, warn
 * @param {string} [content] - 错误详细日志信息
 * @param {Number} [rowNum] - 错误行
 * @param {Number} [colNum] - 错误列
 * @param {Number} timestamp - 时间戳
 * @param {string} unionId - unionId
 * @param {Object} [tags] - 其他用户自定义信息
 */
class ReporterModel {
    constructor(obj) {
        this.init(obj);
    }
    init(obj) {
        const { project, pageUrl, realUrl, resourceUrl, category, sec_category, level, content, rowNum, colNum, timestamp, unionId, tags } = obj || {};
        this.project = project || '';
        this.pageUrl = pageUrl || '';
        this.realUrl = realUrl || '';
        this.resourceUrl = resourceUrl || '';
        this.category = category || JS_ERROR;
        this.sec_category = sec_category || '';
        this.level = level || ERROR;
        this.content = content || '';
        this.rowNum = rowNum || NaN;
        this.colNum = colNum || NaN;
        this.timestamp = timestamp || NaN;
        this.unionId = unionId || '';
        this.tags = tags || {};
    }
}

class MidApis {
    constructor() {
        this.init();
    }
    init() {
        this.storage = new Db();
        this.preReporter();
        this._opt = new ReporterModel();
    }
    preReporter() {
        const data = this.storage.get();
        if (isArray(data) && data.length > 0) {
            this.reporter(data);
        }
        this.isTimeOut();
        this.isMaxCache();
    }
    debug(mode) {
        // 开发模式可以在控制台看到上报的数据
        if (mode === 'dev') {
            return this.storage.get();
        }
        throw new Error('this mode is not dev');
    }
    addError(message, opt, immediate = false) {
        /**
         * 核心功能
         * 1. 拿到错误信息
         *  1.1 封装缓存池
         * 2. 上传到对应服务器
         **/
        if (!message) {
            throw new Error('message is not defined');
        }
        if (!opt) {
            throw new Error('opt is not defined');
        }
        Object.assign(this._opt, opt);
        if (!immediate) {
            this.storage.set({ message, ...this._opt });
            if (!this.time) {
                this.time = (new Date()).getTime();
            }
        }
    }
    isTimeOut() {
        const _storage = this.storage.get();
        if (this.time) {
            const now = (new Date()).getTime();
            if (Math.floor(now / 1000 - this.time / 1000) === CACHE_TIME) {
                this.reporter(_storage);
            }
        }
    }
    isMaxCache() {
        const _storage = this.storage.get();
        if (isArray(_storage) && _storage.length === MAX_SIZE) {
            this.reporter(_storage);
        }
    }
    reporter(data) {
        // 上报
        if (!data)
            throw new Error('data is not defined');
        if (!isArray(data))
            throw new Error('reporter data is error');
        if (data.length === 0)
            throw new Error('reporter data is null');
    }
}

module.exports = MidApis;
/* follow me on Github! @AiWeiEr324 */
//# sourceMappingURL=midApis.js.map
