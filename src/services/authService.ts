import { IAccount, IAuthResponse } from "../models/Account";
import { IInternalServerError } from "../models/ResponseStatus";
import { IUserCreate, IUserResponse } from "../models/User";
import apiService from "./apiService";

const authService = {
  login: (account: IAccount): Promise<IAuthResponse | IInternalServerError> => {
    return apiService.post<IAccount, IAuthResponse | IInternalServerError>("/auth/login", account);
  },
  register: (user: IUserCreate): Promise<IUserResponse | IInternalServerError> => {
    return apiService.post<IUserCreate, IUserResponse | IInternalServerError>("/auth/register", user);
  },
}

export default authService