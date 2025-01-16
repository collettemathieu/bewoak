import type { Rules } from '../types';

export const pDCBPRDescriptionRules: Rules<string | null | undefined> = {
    isValid: function (value) {
        const valueCleaned = value?.trim();

        return valueCleaned !== undefined && valueCleaned.length >= this.minLength && valueCleaned.length <= this.maxLength;
    },
    isRequired: true,
    maxLength: 100,
    minLength: 1,
    textError: function () {
        return `The description is required and it must be between ${this.minLength} and ${this.maxLength} characters long.`;
    },
};
