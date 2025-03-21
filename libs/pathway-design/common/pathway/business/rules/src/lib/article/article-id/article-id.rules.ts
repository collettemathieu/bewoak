import type { Rules } from '../../types';

export const pDCPBRArticleIdRules: Omit<Rules<string | null | undefined>, 'minLength' | 'maxLength'> = {
    isValid: (value) => {
        const uuidV7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return value !== null && value !== undefined && uuidV7Regex.test(value);
    },
    isRequired: true,
    textError: () => 'The article id is required and it must be a uuid v7',
};
