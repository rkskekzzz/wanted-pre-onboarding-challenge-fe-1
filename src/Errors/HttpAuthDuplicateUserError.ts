class AuthDuplicateUserError extends HttpError {
  constructor() {
    super(409, 'Dup user');
  }
}
