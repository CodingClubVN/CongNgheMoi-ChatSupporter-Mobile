import { IAccount, IAuthResponse } from "../models/Account";
import { IInternalServerError } from "../models/ResponseStatus";
import { IUserCreate, IUserCreatedResponse, IUserResponse } from "../models/User";
import apiService from "./apiService";

export async function login(account: IAccount) {
  return apiService.post<IAccount, IAuthResponse | IInternalServerError>("/auth/login", account)
    .then(res => res)
    .catch(err => console.log(err))
}

export async function register(user: IUserCreate) {
  return apiService.post<IUserCreate, IUserCreatedResponse | IInternalServerError>("/auth/register", user)
    .then(res => res)
    .catch(err => console.log(err))
}