import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
  get: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value != null ? value : null;
    } catch (e) {
      console.log(e)
    }
  },
  getObject: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  },
  set: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  },
  setObject: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
    }
  },
  merge: async (key: string, value: any) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e)
    }
  },
  getAll: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      return await AsyncStorage.multiGet(keys)
    } catch (e) {
      console.log(e)
    }
  },
  multiSet: async (keyValuePairs: any[]) => {
    try {
      await AsyncStorage.multiSet(keyValuePairs)
    } catch (e) {
      console.log(e)
    }
  },
  multiRemove: async (keys: string[]) => {
    try {
      await AsyncStorage.multiRemove(keys)
    } catch (e) {
      console.log(e)
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log(e)
    }
  },


}

export default storageService