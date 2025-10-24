import type { Rules } from '../../types';

export const pDCPBRPathwayResearchFieldRules: Rules<string | null | undefined> = {
    isRequired: true,
    isValid: function (value) {
        return (
            value !== undefined &&
            value !== null &&
            value.trim().length !== 0 &&
            value.trim().length >= this.minLength &&
            value.trim().length <= this.maxLength
        );
    },
    maxLength: 100,
    minLength: 1,
    textError: function () {
        return `The research field is required and it must be between ${this.minLength} and ${this.maxLength} characters long.`;
    },
};
