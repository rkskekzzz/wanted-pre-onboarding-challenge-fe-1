class AuthNoUserError extends HttpError {
  constructor() {
    super(409, 'No user');
  }
}
