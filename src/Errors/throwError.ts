import axios, { AxiosError } from 'axios';

export function throwError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
  throw new Error(`Unknown error: ${error}`);
}

/**
 * 409 (Conflict)
 * 400 bad request
 */

class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public debugInfo?: any
  ) {
    super(message);
  }
}

class AuthNoUserError extends HttpError {
  constructor() {
    super(409, 'No user');
  }
}

class AuthDuplicateUserError extends HttpError {
  constructor() {
    super(409, 'Dup user');
  }
}
