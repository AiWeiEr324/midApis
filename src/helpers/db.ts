import { ICacheKey, IData, IObject } from '../interface'
import { isBrowser } from './shared'

const CACHE_KEY = 'apis_data'

abstract class StorageItem {
  data!: Record<string, any>
  arr!: IData
  _this: any
  protected init() {
    this.data = Object.create(null)
    if (isBrowser()) {
      this._this = window.localStorage
    } else {
      this._this = null
    }
  }
  protected getItem(key: ICacheKey) {
    if (key) {
      return this._this ? JSON.parse(this._this.getItem(key)) : this.data[key]
    } else {
      return this.data
    }
  }
  protected setItem(key: string, value: IData) {
    this._this ? this._this.setItem(key, JSON.stringify(value)) : this.data[key] = value
  }
  protected removeItem(key: string) {
    this._this ? this._this.removeItem(key) : delete this.data[key]
  }
  protected clear() {
    this._this ? this._this.clear() : this.init()
  }
}

export default class Db extends StorageItem {
  constructor() {
    super()
    this.init()
    this.get()
  }
  get() {
    this.arr = this.getItem(CACHE_KEY) || []
    return this.arr
  }
  set(value: IObject) {
    if (!value) new Error('value is not defined')
    this.arr.push(value)
    this.setItem(CACHE_KEY, this.arr)
  }
  clearAll() {
    this.removeItem(CACHE_KEY)
  }
}