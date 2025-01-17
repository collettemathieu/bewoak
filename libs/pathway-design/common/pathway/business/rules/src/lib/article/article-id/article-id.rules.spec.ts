import { describe, expect, test } from 'bun:test';
import { pDCPBRArticleIdRules } from './article-id.rules';

describe('Article id business rules', () => {
    test('should return true for a valid uuid v4 article id', () => {
        const validPathwayId = 'e24054b9-92ca-4a22-be67-cf14cc94e6f8';
        expect(pDCPBRArticleIdRules.isValid(validPathwayId)).toBe(true);
    });

    test('should return false for a non uuid v4 value', () => {
        expect(pDCPBRArticleIdRules.isValid(null)).toBe(false);
        expect(pDCPBRArticleIdRules.isValid(undefined)).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('')).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('12345')).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('e24054b9-92ca-7a22-be67-cf14cc94e6f8')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The article id is required and it must be a uuid v4';
        expect(pDCPBRArticleIdRules.textError()).toBe(expectedErrorMessage);
    });
});
