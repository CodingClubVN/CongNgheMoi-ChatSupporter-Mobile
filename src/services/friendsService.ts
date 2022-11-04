import apiService from "./apiService"

export async function getFriends() {
  try {
    const res = await apiService.get<any>("/friends")
    return res
  } catch (err) {
    return console.log(err)
  }
}

export async function sendFriendRequest(data: any) {
  try {
    const res = await apiService.post<any, any>("/friends/request", data)
    return res
  } catch (err) {
    return console.log(err)
  }
}

export async function getFriendRequest() {
  try {
    const res = await apiService.get<any>("/friends/request")
    return res
  } catch (err) {
    return console.log(err)
  }
}

export async function acceptFriendRequest(data: any) {
  try {
    const res = await apiService.post<any, any>("/friends/request/approve", data)
    return res
  } catch (err) {
    return console.log(err)
  }
}

export async function rejectFriendRequest(data: any) {
  try {
    const res = await apiService.post<any, any>("/friends/request/reject", data)
    return res
  } catch (err) {
    return console.log(err)
  }
}

export async function cancelRequest(data: any) {
  try {
    const res = await apiService.post<any, any>(`/friends/request/user/${data.id}/remove`, {})
    return res
  } catch (err) {
    return console.log(err)
  }
}