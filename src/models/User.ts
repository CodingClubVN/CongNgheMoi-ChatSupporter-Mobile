import { IAccount, IAccountResponse } from "./Account";

export interface IUser {
  userId: string
  username: string
  avatarUrl: string
}

export interface IUserA {
  _id?: string
  userId?: string
  username?: string
  avatarUrl?: string
  fullname?: string
  email?: string
  phone?: string
  account?: IAccountResponse
  updatedAt?: string
  createdAt?: string
}
export interface IUserResponse {
  _id: string
  fullname: string
  email: string
  avatarUrl: string
  phone: string
  account: IAccountResponse
  updatedAt: string
  createdAt: string
  friendRequestStatus: string
}

export interface IUserCreate {
  fullname: string
  account: IAccount
  email: string
  phone: string
}

export interface IUserCreatedResponse {
  userId: string
}

export interface IListUserResponse {
  total: number
  data: IUserResponse[]
}
