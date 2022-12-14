import { IInternalServerError } from "../models/ResponseStatus";
import { IListUserResponse, IUserResponse } from "../models/User";
import apiService from "./apiService";

export async function getMe() {
  return apiService.get<IUserResponse | IInternalServerError>("/users/me")
    .then(res => res)
    .catch(err => console.log(err))
}

export async function getUsers(payload: any) {
  return apiService.get<IListUserResponse | IInternalServerError | any>(`/users?search=${payload.search.toLowerCase()}`)
    .then(res => res)
    .catch(err => console.log(err))
}

export async function updateUserProfile(id: string, payload: any) {
  return apiService.putFormData(`/users/${id}`, payload)
    .then(res => res)
    .catch(err => console.log(err))
}