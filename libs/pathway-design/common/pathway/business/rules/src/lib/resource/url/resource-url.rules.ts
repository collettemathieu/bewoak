import type { Rules } from '../../types';

export const pDCPBRResourceUrlRules: Omit<Rules<string | null | undefined>, 'minLength' | 'maxLength'> = {
    isValid: (value) => {
        const urlRegex =
            /^(https?:\/\/)(?:[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+@)?(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(?::\d+)?(?:\/[a-zA-Z0-9_\-./]*)?(?:\?[a-zA-Z0-9_\-=&]*)?(?:#[a-zA-Z0-9_-]*)?$/;
        return value !== null && value !== undefined && value.match(urlRegex) !== null;
    },
    isRequired: true,
    textError: () => 'The url of resource is required and it must be valid',
};
