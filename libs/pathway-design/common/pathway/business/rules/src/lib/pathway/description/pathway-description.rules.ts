import type { Rules } from '../../types';

export const pDCPBRPathwayDescriptionRules: Rules<string | null | undefined> = {
    isValid: function (value) {
        const cleanValue = value?.trim();

        return cleanValue !== undefined && cleanValue.length >= this.minLength && cleanValue.length <= this.maxLength;
    },
    isRequired: true,
    maxLength: 100,
    minLength: 1,
    textError: function () {
        return `The description of pathway is required and it must be between ${this.minLength} and ${this.maxLength} characters long.`;
    },
};
