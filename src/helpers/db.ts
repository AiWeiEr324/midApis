
const CACHE_KEY = 'apis_data'
const LS = (window && window.localStorage) ||
{
  data: {},
  getItem: (key) => {
    if (key) {
      return this.data[key]
    } else {
      return this.data
    }
  },
  setItem: (key, value) => {
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
  set(value) {
    LS.setItem(CACHE_KEY, value)
  }
  clearAll() {
    LS.setItem(CACHE_KEY, '')
  }
}