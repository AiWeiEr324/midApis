
const CACHE_KEY = 'apis_data'
const LS = (window && window.localStorage) ||
{
  data: {},
  getItem: (key: string) => {
    if (key) {
      return this.data[key]
    } else {
      return this.data
    }
  },
  setItem: (key: string, value) => {
    this.data[key] = value
  }
}

class Db {
  constructor() {
    this.get()
  }
  get() {
    return LS.getItem(CACHE_KEY)
  }
  set<T>(value: T) {
    LS.setItem(CACHE_KEY, value)
  }
  clearAll() {
    LS.setItem(CACHE_KEY, '')
  }
}