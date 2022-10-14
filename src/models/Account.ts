export interface IAccount {
  username: string
  password: string
}

export interface IAccountA {
  username?: string
  password?: string
}

export interface IRegisterAccount extends IAccount {
  confirmPassword: string
}

export interface IAuthResponse {
  token: string
}

export interface IAccountResponse {
  username: string
}