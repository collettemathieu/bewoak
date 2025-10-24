import { describe, expect, test } from 'bun:test';
import { pDCPBRPathwayDescriptionRules } from './pathway-description.rules';

describe('Pathway description business rules', () => {
    test('should return true for a valid description', () => {
        const validDescription = 'A valid description';
        expect(pDCPBRPathwayDescriptionRules.isValid(validDescription)).toBe(true);
    });

    test('should return false for a null value', () => {
        expect(pDCPBRPathwayDescriptionRules.isValid(null)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        expect(pDCPBRPathwayDescriptionRules.isValid(undefined)).toBe(false);
    });

    test('should return false for a description longer than the maxLength', () => {
        const longDescription = 'A'.repeat(pDCPBRPathwayDescriptionRules.maxLength + 1);
        expect(pDCPBRPathwayDescriptionRules.isValid(longDescription)).toBe(false);
    });

    test('should return true for a description exactly at maxLength', () => {
        const maxLengthDescription = 'A'.repeat(pDCPBRPathwayDescriptionRules.maxLength);
        expect(pDCPBRPathwayDescriptionRules.isValid(maxLengthDescription)).toBe(true);
    });

    test('should return false for a description shorter than minLength when minLength is superior to 0', () => {
        const shortDescription =
            pDCPBRPathwayDescriptionRules.minLength === 0 ? '' : 'A'.repeat(pDCPBRPathwayDescriptionRules.minLength - 1);
        const resultExpected = pDCPBRPathwayDescriptionRules.minLength === 0;
        expect(pDCPBRPathwayDescriptionRules.isValid(shortDescription)).toBe(resultExpected);
    });

    test('should return true for a description exactly at minLength', () => {
        const minLengthDescription = 'A'.repeat(pDCPBRPathwayDescriptionRules.minLength);
        expect(pDCPBRPathwayDescriptionRules.isValid(minLengthDescription)).toBe(true);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = `The description of pathway is required and it must be between ${pDCPBRPathwayDescriptionRules.minLength} and ${pDCPBRPathwayDescriptionRules.maxLength} characters long.`;
        expect(pDCPBRPathwayDescriptionRules.textError()).toBe(expectedErrorMessage);
    });

    test('should return that the description is always required', () => {
        expect(pDCPBRPathwayDescriptionRules.isRequired).toBe(true);
    });
});
