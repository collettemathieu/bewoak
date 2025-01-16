import { describe, expect, test } from 'bun:test';
import { pDCPBRArticleTitleRules } from './article-title.rules';

describe('Article title business rules', () => {
    test('should return true for a valid title', () => {
        const validDescription = 'A valid title';
        expect(pDCPBRArticleTitleRules.isValid(validDescription)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCPBRArticleTitleRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCPBRArticleTitleRules.isValid(undefined)).toBe(false);
    });

    test('should return false for a title longer than the maxLength', () => {
        const longDescription = 'A'.repeat(pDCPBRArticleTitleRules.maxLength + 1);
        expect(pDCPBRArticleTitleRules.isValid(longDescription)).toBe(false);
    });

    test('should return true for a title exactly at maxLength', () => {
        const maxLengthDescription = 'A'.repeat(pDCPBRArticleTitleRules.maxLength);
        expect(pDCPBRArticleTitleRules.isValid(maxLengthDescription)).toBe(true);
    });

    test('should return false for a title shorter than minLength when minLength is superior to 0', () => {
        const shortDescription = pDCPBRArticleTitleRules.minLength === 0 ? '' : 'A'.repeat(pDCPBRArticleTitleRules.minLength - 1);
        const resultExpected = pDCPBRArticleTitleRules.minLength === 0;
        expect(pDCPBRArticleTitleRules.isValid(shortDescription)).toBe(resultExpected);
    });

    test('should return true for a title exactly at minLength', () => {
        const minLengthDescription = 'A'.repeat(pDCPBRArticleTitleRules.minLength);
        expect(pDCPBRArticleTitleRules.isValid(minLengthDescription)).toBe(true);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The title of article is required and it must be between ${pDCPBRArticleTitleRules.minLength} and ${pDCPBRArticleTitleRules.maxLength} characters long.`;
        expect(pDCPBRArticleTitleRules.textError()).toBe(expectedErrorMessage);
    });

    test('should return that the title is always required', () => {
        expect(pDCPBRArticleTitleRules.isRequired).toBe(true);
    });
});
