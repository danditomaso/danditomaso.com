import CustomError from "./CustomErrorBase";

type ErrorName =
  | "NO_PUBLISHED_PROJECTS"
  | "MISSING_FIELD"
  | "NO_METADATA"
  | "INVALID_METADATA"
  | "INVALID_FILE"
  | "ERROR_CATEGORIZING_PROJECTS"
  | "ERROR_LOADING_PROJECTS"
  | "DIRECTORY_READ_ERROR"
  | "MULTIPLE_PROJECT_ERRORS"
  | "VALIDATION_ERROR";

type ContentErrorProps = {
  name: ErrorName;
  message: string;
  cause?: unknown;
};

export default class ContentError extends CustomError {
  name: ErrorName;
  message: string;
  cause: unknown;

  constructor({ name, message, cause }: ContentErrorProps) {
    super({ name, message, cause });
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
