import { IInternalServerError } from "../models/ResponseStatus";
import { IListUserResponse, IUserResponse } from "../models/User";
import apiService from "./apiService";

export async function getMe() {
  return apiService.get<IUserResponse | IInternalServerError>("/users/me")
    .then(res => res)
    .catch(err => console.log(err))
}

export async function getUsers() {
  return apiService.get<IListUserResponse | IInternalServerError>("/users")
    .then(res => res)
    .catch(err => console.log(err))
}