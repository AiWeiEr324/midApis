import EventBus from './helpers/EventBus'
export default class MidApis {
  _opt!: {
    level: string
    tags: Record<string, any>
  }
  eventBus!: EventBus
  constructor() {
  }
  init() {
    this._opt = {
      level: 'wran',
      tags: {}
    }
    this.eventBus = new EventBus()
  }
  addError(message: string, opt: Options) {
    /** 
     * 核心功能
     * 1. 拿到错误信息
     *  1.1 封装发布订阅模式
     *  1.2 封装缓存池
     * 2. 上传到对应服务器
     **/
    if (!message) {
      throw new Error('message is not defined')
    }
    this._opt = opt
  }
  addUserInfo() {

  }
  
}

interface Options {
  level: string
  tags: Record<string, any>
}