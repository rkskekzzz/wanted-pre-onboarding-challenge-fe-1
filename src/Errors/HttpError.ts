class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public debugInfo?: any
  ) {
    super(message);
  }
}
