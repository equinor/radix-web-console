export class NetworkException extends Error {
  constructor(message, statusCode, innerException = null) {
    super(message);
    this.message = message;
    this.status = statusCode;
    this.innerException = innerException;
  }
}
