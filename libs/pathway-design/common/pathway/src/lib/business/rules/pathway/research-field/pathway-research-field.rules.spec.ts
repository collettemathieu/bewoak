import { describe, expect, test } from 'bun:test';
import { pDCPBRPathwayResearchFieldRules } from './pathway-research-field.rules';

describe('Research field business rules', () => {
    test('should return true for a valid research field', () => {
        const validResearchField = 'A valid research field';
        expect(pDCPBRPathwayResearchFieldRules.isValid(validResearchField)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCPBRPathwayResearchFieldRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCPBRPathwayResearchFieldRules.isValid(undefined)).toBe(false);
    });

    test('should return false for an empty research field', () => {
        const emptyResearchField = '';
        expect(pDCPBRPathwayResearchFieldRules.isValid(emptyResearchField)).toBe(false);
    });

    test('should return false for a research field longer than the maxLength', () => {
        const longResearchField = 'A'.repeat(pDCPBRPathwayResearchFieldRules.maxLength + 1);
        expect(pDCPBRPathwayResearchFieldRules.isValid(longResearchField)).toBe(false);
    });

    test('should return true for a research field exactly at maxLength', () => {
        const maxLengthResearchField = 'A'.repeat(pDCPBRPathwayResearchFieldRules.maxLength);
        expect(pDCPBRPathwayResearchFieldRules.isValid(maxLengthResearchField)).toBe(true);
    });

    test('should return false for a research field shorter than minLength', () => {
        const shortResearchField = 'A'.repeat(pDCPBRPathwayResearchFieldRules.minLength - 1);
        expect(pDCPBRPathwayResearchFieldRules.isValid(shortResearchField)).toBe(false);
    });

    test('should return true for a research field exactly at minLength', () => {
        const minLengthResearchField = 'A'.repeat(pDCPBRPathwayResearchFieldRules.minLength);
        expect(pDCPBRPathwayResearchFieldRules.isValid(minLengthResearchField)).toBe(true);
    });

    test('should return false for a research field with only spaces', () => {
        const spacesResearchField = '     ';
        expect(pDCPBRPathwayResearchFieldRules.isValid(spacesResearchField)).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The research field is required and it must be between ${pDCPBRPathwayResearchFieldRules.minLength} and ${pDCPBRPathwayResearchFieldRules.maxLength} characters long.`;
        expect(pDCPBRPathwayResearchFieldRules.textError()).toBe(expectedErrorMessage);
    });
});
