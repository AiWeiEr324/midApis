import { IReporter, IData } from './interface'
import Db  from './helpers/db'
import Model from './helpers/model'
import { isArray } from './helpers/shared'
import { CACHE_TIME, MAX_SIZE } from './helpers/constant'
export default class MidApis {
  _opt!: IReporter
  storage!: Db
  time?: number
  constructor() {
    this.init()
  }
  init() {
    this.storage = new Db()
    this.preReporter()
    this._opt = new Model()
  }
  private preReporter() {
    const data: IData | [] = this.storage.get() as IData | []
    if (isArray(data) && data.length > 0) {
      this.reporter(data)
    }
    this.isTimeOut()
    this.isMaxCache()
  }
  debug(mode: string) {
    // 开发模式可以在控制台看到上报的数据
    if (mode === 'dev') {
      return this.storage.get()
    }
    throw new Error('this mode is not dev')
  }
  addError(message: string, opt: IReporter, immediate: boolean = false) {
    /** 
     * 核心功能
     * 1. 拿到错误信息
     *  1.1 封装缓存池
     * 2. 上传到对应服务器
     **/
    if (!message) {
      throw new Error('message is not defined')
    }
    if (!opt) {
      throw new Error('opt is not defined')
    }
    Object.assign(this._opt, opt)
    if (!immediate) {
      this.storage.set({message, ...this._opt})
      if (!this.time) {
        this.time = (new Date()).getTime()
      }
    } else {
      // 调用上报接口w
    }
  }
  private isTimeOut() {
    const _storage = this.storage.get()
    if (this.time) {
      const now: number = (new Date()).getTime()
      if (Math.floor(now/1000 - this.time/1000) === CACHE_TIME) {
        this.reporter(_storage)
      }
    }
  }
  private isMaxCache() {
    const _storage = this.storage.get()
    if (isArray(_storage) && _storage.length === MAX_SIZE) {
      this.reporter(_storage)
    }
  }
  private reporter(data?: IData) {
    // 上报
    if (!data) throw new Error('data is not defined')
    if (!isArray(data)) throw new Error('reporter data is error')
    if (data.length === 0) throw new Error('reporter data is null')
  }
}