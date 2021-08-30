export class FilterValueValidatorError extends Error {
  public constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, FilterValueValidatorError.prototype);
  }
}
