import storageService from "./storageService"

const apiPath = 'https://api.hieud.me/api'

const apiService = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${apiPath}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${storageService.get('accessToken')}`
      }
    })
    return await response.json()
  },
  post: async <T, RT>(path: string, data: T): Promise<RT> => {
    const response = await fetch(`${apiPath}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${storageService.get('accessToken')}`
      },
      body: JSON.stringify(data)
    });
    return await response.json()
  },
  put: async <T, RT>(path: string, data: T): Promise<RT> => {
    const response = await fetch(`${apiPath}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${storageService.get('accessToken')}`
      },
      body: JSON.stringify(data)
    });
    return await response.json()
  },
  delete: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${apiPath}${path}`, {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${storageService.get('accessToken')}`
      },
      method: 'DELETE'
    });
    return await response.json()
  }
}

export default apiService