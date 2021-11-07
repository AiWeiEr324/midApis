class MidApis {
  constructor() {

  }
  init() {

  }
  addError(message: string, opt: Options) {
    /** 
     * 核心功能
     * 1. 拿到错误信息
     *  1.1 封装发布订阅模式
     *  1.2 封装缓存池
     * 2. 上传到对应服务器
     **/
  }
  addUserInfo() {

  }
  
}

interface Options {
  level: string
  tags: Record<string, any>
}