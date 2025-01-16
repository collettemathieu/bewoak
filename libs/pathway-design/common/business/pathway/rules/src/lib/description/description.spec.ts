import { describe, expect, test } from 'bun:test';
import { pDCBPRDescriptionRules } from './description.rules';

describe('Description business rules', () => {
    test('should return true for a valid description', () => {
        const validDescription = 'A valid description';
        expect(pDCBPRDescriptionRules.isValid(validDescription)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCBPRDescriptionRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCBPRDescriptionRules.isValid(undefined)).toBe(false);
    });

    test('should return false for a description longer than the maxLength', () => {
        const longDescription = 'A'.repeat(pDCBPRDescriptionRules.maxLength + 1);
        expect(pDCBPRDescriptionRules.isValid(longDescription)).toBe(false);
    });

    test('should return true for a description exactly at maxLength', () => {
        const maxLengthDescription = 'A'.repeat(pDCBPRDescriptionRules.maxLength);
        expect(pDCBPRDescriptionRules.isValid(maxLengthDescription)).toBe(true);
    });

    test('should return false for a description shorter than minLength when minLength is superior to 0', () => {
        const shortDescription = pDCBPRDescriptionRules.minLength === 0 ? '' : 'A'.repeat(pDCBPRDescriptionRules.minLength - 1);
        const resultExpected = pDCBPRDescriptionRules.minLength === 0;
        expect(pDCBPRDescriptionRules.isValid(shortDescription)).toBe(resultExpected);
    });

    test('should return true for a description exactly at minLength', () => {
        const minLengthDescription = 'A'.repeat(pDCBPRDescriptionRules.minLength);
        expect(pDCBPRDescriptionRules.isValid(minLengthDescription)).toBe(true);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The description is required and it must be between ${pDCBPRDescriptionRules.minLength} and ${pDCBPRDescriptionRules.maxLength} characters long.`;
        expect(pDCBPRDescriptionRules.textError()).toBe(expectedErrorMessage);
    });

    test('should return that the description is always required', () => {
        expect(pDCBPRDescriptionRules.isRequired).toBe(true);
    });
});
