import { describe, expect, test } from 'bun:test';
import { pDCPBRArticleIdRules } from './article-id.rules';

describe('Article id business rules', () => {
    test('should return true for a valid uuid v7 article id', () => {
        const validArticleId = '019499f9-812d-7e22-84ca-fc22da1765db';
        expect(pDCPBRArticleIdRules.isValid(validArticleId)).toBe(true);
    });

    test('should return false for a non uuid v7 value', () => {
        expect(pDCPBRArticleIdRules.isValid(null)).toBe(false);
        expect(pDCPBRArticleIdRules.isValid(undefined)).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('')).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('12345')).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('e24054b9-92ca-4a22-be67-cf14cc94e6f8')).toBe(false);
        expect(pDCPBRArticleIdRules.isValid('123e4567-e89b-6a12-8d3a-426614174000')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The article id is required and it must be a uuid v7';
        expect(pDCPBRArticleIdRules.textError()).toBe(expectedErrorMessage);
    });
});
