import { describe, expect, test } from 'bun:test';
import { pDCBPRTitleRules } from './title.rules';

describe('Title business rules', () => {
    test('should return true for a valid title', () => {
        const validTitle = 'A valid title';
        expect(pDCBPRTitleRules.isValid(validTitle)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCBPRTitleRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCBPRTitleRules.isValid(undefined)).toBe(false);
    });

    test('should return false for an empty title', () => {
        const emptyTitle = '';
        expect(pDCBPRTitleRules.isValid(emptyTitle)).toBe(false);
    });

    test('should return false for a title longer than the maxLength', () => {
        const longTitle = 'A'.repeat(pDCBPRTitleRules.maxLength + 1);
        expect(pDCBPRTitleRules.isValid(longTitle)).toBe(false);
    });

    test('should return true for a title exactly at maxLength', () => {
        const maxLengthTitle = 'A'.repeat(pDCBPRTitleRules.maxLength);
        expect(pDCBPRTitleRules.isValid(maxLengthTitle)).toBe(true);
    });

    test('should return false for a title shorter than minLength', () => {
        const shortTitle = 'A'.repeat(pDCBPRTitleRules.minLength - 1);
        expect(pDCBPRTitleRules.isValid(shortTitle)).toBe(false);
    });

    test('should return true for a title exactly at minLength', () => {
        const minLengthTitle = 'A'.repeat(pDCBPRTitleRules.minLength);
        expect(pDCBPRTitleRules.isValid(minLengthTitle)).toBe(true);
    });

    test('should return false for a title with only spaces', () => {
        const spacesTitle = '     ';
        expect(pDCBPRTitleRules.isValid(spacesTitle)).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The title is required and it must be between ${pDCBPRTitleRules.minLength} and ${pDCBPRTitleRules.maxLength} characters long.`;
        expect(pDCBPRTitleRules.textError()).toBe(expectedErrorMessage);
    });
});
