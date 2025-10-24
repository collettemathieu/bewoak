import type { Rules } from '../../types';

export const pDCPBRArticleTitleRules: Rules<string | null | undefined> = {
    isRequired: true,
    isValid: function (value) {
        const cleanValue = value?.trim();

        return cleanValue !== undefined && cleanValue.length >= this.minLength && cleanValue.length <= this.maxLength;
    },
    maxLength: 100,
    minLength: 1,
    textError: function () {
        return `The title of article is required and it must be between ${this.minLength} and ${this.maxLength} characters long.`;
    },
};
