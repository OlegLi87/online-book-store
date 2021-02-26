// login,signup error type
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
