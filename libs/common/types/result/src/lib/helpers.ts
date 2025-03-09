import { FAILURE, SUCCESS } from './constants';
import type { Failure, Result, Success } from './types';

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

export const failureValueList = <T extends unknown[]>(
    resultList: { [K in keyof T]: Result<unknown, T[K]> }
): { [K in keyof T]: T[K] } =>
    resultList.filter((result) => isFailure(result)).map((result) => result.value) as { [K in keyof T]: T[K] };

export const successValueList = <T extends unknown[]>(
    resultList: { [K in keyof T]: Result<T[K], unknown> }
): { [K in keyof T]: T[K] } => {
    return resultList.filter((result) => isSuccess(result)).map((result) => result.value) as { [K in keyof T]: T[K] };
};
