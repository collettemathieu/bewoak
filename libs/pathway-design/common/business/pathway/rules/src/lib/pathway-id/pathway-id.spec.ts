import { describe, expect, test } from 'bun:test';
import { pDCBPRPathwayIdRules } from './pathway-id.rules';

describe('Pathway id business rules', () => {
    test('should return true for a valid uuid v4 pathway id', () => {
        const validPathwayId = 'e24054b9-92ca-4a22-be67-cf14cc94e6f8';
        expect(pDCBPRPathwayIdRules.isValid(validPathwayId)).toBe(true);
    });

    test('should return false for a non uuid v4 value', () => {
        expect(pDCBPRPathwayIdRules.isValid(null)).toBe(false);
        expect(pDCBPRPathwayIdRules.isValid(undefined)).toBe(false);
        expect(pDCBPRPathwayIdRules.isValid('')).toBe(false);
        expect(pDCBPRPathwayIdRules.isValid('12345')).toBe(false);
        expect(pDCBPRPathwayIdRules.isValid('e24054b9-92ca-7a22-be67-cf14cc94e6f8')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The pathway id is required and it must be a uuid v4';
        expect(pDCBPRPathwayIdRules.textError()).toBe(expectedErrorMessage);
    });
});
