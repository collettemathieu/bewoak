import { describe, expect, test } from 'bun:test';
import { pDCPBRResourceIdRules } from './resource-id.rules';

describe('Resource id business rules', () => {
    test('should return true for a valid uuid v4 resource id', () => {
        const validPathwayId = 'e24054b9-92ca-4a22-be67-cf14cc94e6f8';
        expect(pDCPBRResourceIdRules.isValid(validPathwayId)).toBe(true);
    });

    test('should return false for a non uuid v4 value', () => {
        expect(pDCPBRResourceIdRules.isValid(null)).toBe(false);
        expect(pDCPBRResourceIdRules.isValid(undefined)).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('')).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('12345')).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('e24054b9-92ca-7a22-be67-cf14cc94e6f8')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The resource id is required and it must be a uuid v4';
        expect(pDCPBRResourceIdRules.textError()).toBe(expectedErrorMessage);
    });
});
