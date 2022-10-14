import { IAccount, IAccountResponse } from "./Account";

export interface IUser {
  userId: string
  username: string
  avatarUrl: string
}

export interface IUserA {
  userId?: string
  username?: string
  avatarUrl?: string
  fullName?: string
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
