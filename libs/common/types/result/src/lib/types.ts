import type { FAILURE, SUCCESS } from './constants';

export type Success<T> = {
    tag: typeof SUCCESS;
    value: T;
};

export type Failure<E> = {
    tag: typeof FAILURE;
    value: E;
};

export type Result<T, E> = Success<T> | Failure<E>;
export type AsyncResult<T, E> = Promise<Result<T, E>>;
