import { Account } from "./Account";

export interface User {
  id: string,
  fullname: string,
  address: string,
  email: string,
  avatarUrl: string,
  phone: string,
  account: Account,
  about: string,
  yearOfBirth: number,
  updatedAt: number,
  createdAt: number
}