import { beforeAll, describe, expect, test } from 'bun:test';
import { ResearchFieldValueObjects } from './research-field.value-object';

describe('ResearchFieldValueObjects', () => {
    let researchField1: ResearchFieldValueObjects;
    let researchField2: ResearchFieldValueObjects;

    beforeAll(() => {
        researchField1 = new ResearchFieldValueObjects('Test researchField');
        researchField2 = new ResearchFieldValueObjects(
            'Different researchField'
        );
    });

    test('should create an instance with a valid researchField', () => {
        const researchField = new ResearchFieldValueObjects(
            'Test researchField'
        );
        expect(researchField.value).toBe('Test researchField');
    });

    test('should throw an error if the researchField is empty', () => {
        expect(() => new ResearchFieldValueObjects('')).toThrowError(
            'Research field is required'
        );
    });

    test('should return true when comparing two equal researchFields', () => {
        const sameresearchField1 = new ResearchFieldValueObjects(
            'Test researchField'
        );
        const sameresearchField2 = new ResearchFieldValueObjects(
            'Test researchField'
        );
        expect(sameresearchField1.equals(sameresearchField2)).toBe(true);
    });

    test('should return false when comparing two different researchFields', () => {
        expect(researchField1.equals(researchField2)).toBe(false);
    });

    test('should return the researchField as a string', () => {
        expect(researchField1.toString()).toBe('Test researchField');
    });
});
