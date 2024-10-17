import { describe, expect, test } from 'bun:test';
import { pDCBPRResearchFieldRules } from './research-field.rules';

describe('Research field business rules', () => {
    test('should return true for a valid research field', () => {
        const validResearchField = 'A valid research field';
        expect(pDCBPRResearchFieldRules.isValid(validResearchField)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCBPRResearchFieldRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCBPRResearchFieldRules.isValid(undefined)).toBe(false);
    });

    test('should return false for an empty research field', () => {
        const emptyResearchField = '';
        expect(pDCBPRResearchFieldRules.isValid(emptyResearchField)).toBe(false);
    });

    test('should return false for a research field longer than the maxLength', () => {
        const longResearchField = 'A'.repeat(pDCBPRResearchFieldRules.maxLength + 1);
        expect(pDCBPRResearchFieldRules.isValid(longResearchField)).toBe(false);
    });

    test('should return true for a research field exactly at maxLength', () => {
        const maxLengthResearchField = 'A'.repeat(pDCBPRResearchFieldRules.maxLength);
        expect(pDCBPRResearchFieldRules.isValid(maxLengthResearchField)).toBe(true);
    });

    test('should return false for a research field shorter than minLength', () => {
        const shortResearchField = 'A'.repeat(pDCBPRResearchFieldRules.minLength - 1);
        expect(pDCBPRResearchFieldRules.isValid(shortResearchField)).toBe(false);
    });

    test('should return true for a research field exactly at minLength', () => {
        const minLengthResearchField = 'A'.repeat(pDCBPRResearchFieldRules.minLength);
        expect(pDCBPRResearchFieldRules.isValid(minLengthResearchField)).toBe(true);
    });

    test('should return false for a research field with only spaces', () => {
        const spacesResearchField = '     ';
        expect(pDCBPRResearchFieldRules.isValid(spacesResearchField)).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The research field is required and it must be between ${pDCBPRResearchFieldRules.minLength} and ${pDCBPRResearchFieldRules.maxLength} characters long.`;
        expect(pDCBPRResearchFieldRules.textError()).toBe(expectedErrorMessage);
    });
});
