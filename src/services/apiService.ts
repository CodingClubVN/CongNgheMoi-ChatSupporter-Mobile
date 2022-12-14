import storageService from "./storageService"

const apiPath = 'https://api.hieud.me/api'

const apiService = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${apiPath}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${await storageService.get('token')}`
      }
    })
    return await response.json()
  },
  post: async <T, RT>(path: string, data: any): Promise<RT> => {
    const response = await fetch(`${apiPath}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${await storageService.get('token')}`,
      },
      body: typeof data === 'object' ? JSON.stringify(data) : data
    });
    return await response.json()
  },
  postFormData: async (path: string, data: any): Promise<any> => {
    // const file: any = {
    //   uri: data.file.uri,
    //   type: data.file.type,
    //   name: data.file.name
    // }
    // var formData = new FormData();
    // formData.append("file", file);
    // formData.append("type", data.type);

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', path);
    // console.log('OPENED', xhr.status);

    // xhr.onprogress = function () {
    //   console.log('LOADING', xhr.status);
    // };

    // xhr.onload = function () {
    //   console.log('DONE', xhr.status);
    // };

    // xhr.setRequestHeader('Authorization', `Bearer ${await storageService.get('token')}`);
    // xhr.send(formData);
    const response = await fetch(`${apiPath}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${await storageService.get('token')}`,
      },
      body: data
    });
    return await response.json()
  },
  put: async <T, RT>(path: string, data: T): Promise<RT> => {
    const response = await fetch(`${apiPath}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${await storageService.get('token')}`
      },
      body: JSON.stringify(data)
    });
    return await response.json()
  },
  putFormData: async (path: string, data: any): Promise<any> => {
    // const file: any = {
    //   uri: data.file.uri,
    //   type: data.file.type,
    //   name: data.file.name
    // }
    // var formData = new FormData();
    // formData.append("file", file);
    // formData.append("type", data.type);

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', path);
    // console.log('OPENED', xhr.status);

    // xhr.onprogress = function () {
    //   console.log('LOADING', xhr.status);
    // };

    // xhr.onload = function () {
    //   console.log('DONE', xhr.status);
    // };

    // xhr.setRequestHeader('Authorization', `Bearer ${await storageService.get('token')}`);
    // xhr.send(formData);
    const response = await fetch(`${apiPath}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${await storageService.get('token')}`,
      },
      body: data
    });
    return await response.json()
  },
  delete: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${apiPath}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${await storageService.get('token')}`
      },
      method: 'DELETE'
    });
    return await response.json()
  }
}

export default apiService