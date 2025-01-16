import { describe, expect, test } from 'bun:test';
import { pDCPBRPathwayTitleRules } from './pathway-title.rules';

describe('Title business rules', () => {
    test('should return true for a valid title', () => {
        const validTitle = 'A valid title';
        expect(pDCPBRPathwayTitleRules.isValid(validTitle)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCPBRPathwayTitleRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCPBRPathwayTitleRules.isValid(undefined)).toBe(false);
    });

    test('should return false for an empty title', () => {
        const emptyTitle = '';
        expect(pDCPBRPathwayTitleRules.isValid(emptyTitle)).toBe(false);
    });

    test('should return false for a title longer than the maxLength', () => {
        const longTitle = 'A'.repeat(pDCPBRPathwayTitleRules.maxLength + 1);
        expect(pDCPBRPathwayTitleRules.isValid(longTitle)).toBe(false);
    });

    test('should return true for a title exactly at maxLength', () => {
        const maxLengthTitle = 'A'.repeat(pDCPBRPathwayTitleRules.maxLength);
        expect(pDCPBRPathwayTitleRules.isValid(maxLengthTitle)).toBe(true);
    });

    test('should return false for a title shorter than minLength', () => {
        const shortTitle = 'A'.repeat(pDCPBRPathwayTitleRules.minLength - 1);
        expect(pDCPBRPathwayTitleRules.isValid(shortTitle)).toBe(false);
    });

    test('should return true for a title exactly at minLength', () => {
        const minLengthTitle = 'A'.repeat(pDCPBRPathwayTitleRules.minLength);
        expect(pDCPBRPathwayTitleRules.isValid(minLengthTitle)).toBe(true);
    });

    test('should return false for a title with only spaces', () => {
        const spacesTitle = '     ';
        expect(pDCPBRPathwayTitleRules.isValid(spacesTitle)).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The title is required and it must be between ${pDCPBRPathwayTitleRules.minLength} and ${pDCPBRPathwayTitleRules.maxLength} characters long.`;
        expect(pDCPBRPathwayTitleRules.textError()).toBe(expectedErrorMessage);
    });
});
