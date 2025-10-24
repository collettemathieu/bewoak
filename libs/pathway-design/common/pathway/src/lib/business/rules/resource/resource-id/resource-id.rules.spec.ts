import { describe, expect, test } from 'bun:test';
import { pDCPBRResourceIdRules } from './resource-id.rules';

describe('Resource id business rules', () => {
    test('should return true for a valid uuid v7 resource id', () => {
        const validResourceId = '018c0a0c-50e0-7b9e-89ab-123456789abc';
        expect(pDCPBRResourceIdRules.isValid(validResourceId)).toBe(true);
    });

    test('should return false for a non uuid v7 value', () => {
        expect(pDCPBRResourceIdRules.isValid(null)).toBe(false);
        expect(pDCPBRResourceIdRules.isValid(undefined)).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('')).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('12345')).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('e24054b9-92ca-4a22-be67-cf14cc94e6f8')).toBe(false);
        expect(pDCPBRResourceIdRules.isValid('123e4567-e89b-6a12-8d3a-426614174000')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The resource id is required and it must be a uuid v7';
        expect(pDCPBRResourceIdRules.textError()).toBe(expectedErrorMessage);
    });
});
