import { describe, expect, test } from 'bun:test';
import { PDCBPR_titleRules } from './title.rules';

describe('PDCBPR_titleRules', () => {
    test('should return true for a valid title', () => {
        const validTitle = 'A valid title';
        expect(PDCBPR_titleRules.isValid(validTitle)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(PDCBPR_titleRules.isValid(null)).toBe(false);
    });

    test('should return false for an empty title', () => {
        const emptyTitle = '';
        expect(PDCBPR_titleRules.isValid(emptyTitle)).toBe(false);
    });

    test('should return false for a title longer than the maxLength', () => {
        const longTitle = 'A'.repeat(PDCBPR_titleRules.maxLength + 1);
        expect(PDCBPR_titleRules.isValid(longTitle)).toBe(false);
    });

    test('should return true for a title exactly at maxLength', () => {
        const maxLengthTitle = 'A'.repeat(PDCBPR_titleRules.maxLength);
        expect(PDCBPR_titleRules.isValid(maxLengthTitle)).toBe(true);
    });

    test('should return false for a title with only spaces', () => {
        const spacesTitle = '     ';
        expect(PDCBPR_titleRules.isValid(spacesTitle)).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `Renseigner un nom entre 1 et ${PDCBPR_titleRules.maxLength} caractères.`;
        expect(PDCBPR_titleRules.textError()).toBe(expectedErrorMessage);
    });
});
