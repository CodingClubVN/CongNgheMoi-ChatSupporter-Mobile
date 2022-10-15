import { IAccount, IAuthResponse } from "../models/Account";
import { IInternalServerError } from "../models/ResponseStatus";
import { IUserCreate, IUserCreatedResponse, IUserResponse } from "../models/User";
import apiService from "./apiService";

export async function login(account: IAccount) {
  try {
    const res = await apiService.post<IAccount, IAuthResponse | IInternalServerError>("/auth/login", account);
    return res;
  } catch (err) {
    return console.log(err);
  }
}

export async function register(user: IUserCreate) {
  try {
    const res = await apiService.post<IUserCreate, IUserCreatedResponse | IInternalServerError>("/auth/register", user);
    return res;
  } catch (err) {
    return console.log(err);
  }
}