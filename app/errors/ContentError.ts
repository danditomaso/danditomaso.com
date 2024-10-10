import CustomError from './CustomErrorBase'

type ErrorName =
  | 'UNABLE_TO_LOAD_PROJECTS'
  | 'ERROR_CATEGORIZING_PROJECTS'


type ContentErrorProps = {
  name: ErrorName;
  message: string;
  cause?: unknown;
}

export default class ContentError extends CustomError {
  name: ErrorName;
  message: string;
  cause: unknown;

  constructor({
    name,
    message,
    cause,
  }: ContentErrorProps) {
    super({ name, message, cause });
    this.name = name
    this.message = message;
    this.cause = cause;
  }



}