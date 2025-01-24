import { describe, expect, test } from 'bun:test';
import { pDCPBRPathwayIdRules } from './pathway-id.rules';

describe('Pathway id business rules', () => {
    test('should return true for a valid uuid v4 pathway id', () => {
        const validPathwayId = '018c0a0c-50e0-7b9e-89ab-123456789abc';
        expect(pDCPBRPathwayIdRules.isValid(validPathwayId)).toBe(true);
    });

    test('should return false for a non uuid v4 value', () => {
        expect(pDCPBRPathwayIdRules.isValid(null)).toBe(false);
        expect(pDCPBRPathwayIdRules.isValid(undefined)).toBe(false);
        expect(pDCPBRPathwayIdRules.isValid('')).toBe(false);
        expect(pDCPBRPathwayIdRules.isValid('12345')).toBe(false);
        expect(pDCPBRPathwayIdRules.isValid('e24054b9-92ca-4a22-be67-cf14cc94e6f8')).toBe(false);
        expect(pDCPBRPathwayIdRules.isValid('123e4567-e89b-6a12-8d3a-426614174000')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The pathway id is required and it must be a uuid v7';
        expect(pDCPBRPathwayIdRules.textError()).toBe(expectedErrorMessage);
    });
});
