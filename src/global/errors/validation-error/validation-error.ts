import { VALIDATION_ERROR } from "@constants/errors";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = VALIDATION_ERROR;
  }
}
