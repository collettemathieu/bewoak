import type { Rules } from '../types';

export const PDCBPR_titleRules: Rules = {
    textError: function () {
        return `Renseigner un nom entre 1 et ${this.maxLength} caractères.`;
    },
    isValid: function (value: string | null) {
        return value !== null && value.trim().length !== 0 && value.trim().length <= this.maxLength;
    },
    isRequired: true,
    maxLength: 100,
};
