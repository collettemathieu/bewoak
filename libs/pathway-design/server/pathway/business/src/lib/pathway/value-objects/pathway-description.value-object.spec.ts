import { pDCPBRPathwayDescriptionRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { beforeAll, describe, expect, test } from 'bun:test';
import { PathwayDescriptionValueObject } from './pathway-description.value-object';

describe('PathwayDescriptionValueObject', () => {
    let description1: PathwayDescriptionValueObject;
    let description2: PathwayDescriptionValueObject;

    beforeAll(() => {
        description1 = new PathwayDescriptionValueObject('Test description');
        description2 = new PathwayDescriptionValueObject('Different description');
    });

    test('should create an instance with a valid description', () => {
        const description = new PathwayDescriptionValueObject('Test description');
        expect(description.value).toBe('Test description');
    });

    test('should throw an error if the description is invalid', () => {
        expect(() => new PathwayDescriptionValueObject('')).toThrowError(pDCPBRPathwayDescriptionRules.textError());
    });

    test('should return true when comparing two equal descriptions', () => {
        const samedescription1 = new PathwayDescriptionValueObject('Test description');
        const samedescription2 = new PathwayDescriptionValueObject('Test description');
        expect(samedescription1.equals(samedescription2)).toBe(true);
    });

    test('should return false when comparing two different descriptions', () => {
        expect(description1.equals(description2)).toBe(false);
    });

    test('should return the description as a string', () => {
        expect(description1.toString()).toBe('Test description');
    });
});
