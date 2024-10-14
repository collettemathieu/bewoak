export interface Rules {
    textError: () => string;
    isValid: (value: string | null) => boolean;
    readonly isRequired: boolean;
    readonly maxLength: number;
}
