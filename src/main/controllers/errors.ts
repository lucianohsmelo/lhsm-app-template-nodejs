export class InvalidRequestError extends Error {
  constructor() {
    super();
    this.message = 'Bad Request';
  }
}
