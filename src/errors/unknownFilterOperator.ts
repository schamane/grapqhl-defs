export class UnknowFilterOperatorError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UnknowFilterOperatorError.prototype);
  }
}
