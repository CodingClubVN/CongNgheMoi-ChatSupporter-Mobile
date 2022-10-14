export interface IInternalServerError {
  status: number
  message?: string[]
  error?: string
}

export interface ISuccessful {
  statusCode: number
  message: string
}