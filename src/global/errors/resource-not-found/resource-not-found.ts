import { RESOURCE_NOT_FOUND_ERROR } from "@constants/errors";

export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = RESOURCE_NOT_FOUND_ERROR;
  }
}
