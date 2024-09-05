export class NetworkException extends Error {
  public status: number
  public innerException?: string

  constructor(
    message: string,
    statusCode: number,
    innerException: string = null
  ) {
    super(message)
    this.message = message
    this.status = statusCode
    this.innerException = innerException
  }
}
