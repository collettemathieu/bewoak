export interface Rules<T> {
    isValid: (value: T) => boolean;
    readonly isRequired: boolean;
    readonly maxLength: number;
    readonly minLength: number;
    textError: () => string;
}
