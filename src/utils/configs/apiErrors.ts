export class ServerTimeoutError extends Error {}

export class CommonServerError extends Error {
  code?: string;
  status?: number;

  constructor({ code, status }: CommonServerError) {
    super();
    this.code = code;
    this.status = status;
  }
}

export type ArrayBufferError = { responseType: string };

export class SessionTimeOutError extends Error {}

export class MaintenanceServerError extends Error {}

export class ErrorResponse extends Error {
  status: number;
  code: string;
  message: string;

  constructor({ status, code, message }: ErrorResponse) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

export class RequestAbortedError extends Error {}
export class NetworkError extends Error {}

export type ApiErrors =
  | ErrorResponse
  | ServerTimeoutError
  | CommonServerError
  | SessionTimeOutError
  | MaintenanceServerError
  | NetworkError
  | RequestAbortedError;
