import { IInternalServerError } from "../models/ResponseStatus";
import { IListUserResponse, IUserResponse } from "../models/User";
import apiService from "./apiService";

const userService = {
  getMe: (): Promise<IUserResponse | IInternalServerError> => {
    return apiService.get<IUserResponse | IInternalServerError>("/users/me");
  },
  getUsers: (): Promise<IListUserResponse | IInternalServerError> => {
    return apiService.get<IListUserResponse | IInternalServerError>("/users");
  }
}

export default userService