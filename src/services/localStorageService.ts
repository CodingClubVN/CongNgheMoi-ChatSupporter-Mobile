const localStorageService = {
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null')
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}

export default localStorageService