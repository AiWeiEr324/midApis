import { ICallback } from '../interface'
class EventBus {
  handlers: Record<string, any>
  constructor() {
    this.handlers = {}
  }
  on(eventName: string, handler: Function) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(handler)
  }
  off(eventName: string, handler: Function) {
    const handlers = this.handlers[eventName]
    const index = handlers.indexOf(handler)
    if (index !== -1) {
      handlers.splice(index, 1)
    }
  }
  trigger(eventName: string, ...args: any[]) {
    if (this.handlers[eventName]) {
      const handlers = this.handlers[eventName].slice()
      handlers.forEach((handler: ICallback) => {
        handler(...args)
      })
    }
  }
  once(eventName: string, handler: Function) {
    const wrapper = (...args: any[]) => {
      handler(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

export default EventBus