const SUCCESS = 'success' as const;
const FAILURE = 'failure' as const;

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

export const success = <T>(value: T): Success<T> => ({
    tag: SUCCESS,
    value,
});
export const failure = <E>(value: E): Failure<E> => ({
    tag: FAILURE,
    value,
});

export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> => result.tag === SUCCESS;
export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> => result.tag === FAILURE;

export const successValue = <T, E>(result: Result<T, E>): T => {
    if (isSuccess(result)) {
        return result.value;
    }

    throw new Error('Result is not success');
};

export const failureValue = <T, E>(result: Result<T, E>): E => {
    if (isFailure(result)) {
        return result.value;
    }

    throw new Error('Result is not failure');
};
