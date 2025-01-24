import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRPathwayResearchFieldRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayResearchFieldValueObject } from './pathway-research-field.value-object';

describe('PathwayResearchFieldValueObject', () => {
    let researchField1: PathwayResearchFieldValueObject;
    let researchField2: PathwayResearchFieldValueObject;

    beforeAll(() => {
        researchField1 = new PathwayResearchFieldValueObject('Test researchField');
        researchField2 = new PathwayResearchFieldValueObject('Different researchField');
    });

    test('should create an instance with a valid researchField', () => {
        const researchField = new PathwayResearchFieldValueObject('Test researchField');
        expect(researchField.value).toBe('Test researchField');
    });

    test('should throw an error if the researchField is invalid', () => {
        expect(() => new PathwayResearchFieldValueObject('')).toThrowError(pDCPBRPathwayResearchFieldRules.textError());
    });

    test('should return true when comparing two equal researchFields', () => {
        const sameresearchField1 = new PathwayResearchFieldValueObject('Test researchField');
        const sameresearchField2 = new PathwayResearchFieldValueObject('Test researchField');
        expect(sameresearchField1.equals(sameresearchField2)).toBe(true);
    });

    test('should return false when comparing two different researchFields', () => {
        expect(researchField1.equals(researchField2)).toBe(false);
    });

    test('should return the researchField as a string', () => {
        expect(researchField1.toString()).toBe('Test researchField');
    });
});
