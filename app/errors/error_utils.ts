import type { Result } from "neverthrow";

export const isResultError = <T, E>(result: Result<T, E>): boolean => result.isErr();
