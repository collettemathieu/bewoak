import { beforeAll, describe, expect, test } from 'bun:test';
import { DescriptionValueObject } from './description.value-object';

describe('DescriptionValueObject', () => {
    let description1: DescriptionValueObject;
    let description2: DescriptionValueObject;

    beforeAll(() => {
        description1 = new DescriptionValueObject('Test description');
        description2 = new DescriptionValueObject('Different description');
    });

    test('should create an instance with a valid description', () => {
        const description = new DescriptionValueObject('Test description');
        expect(description.value).toBe('Test description');
    });

    test('should throw an error if the description is empty', () => {
        expect(() => new DescriptionValueObject('')).toThrowError(
            'Description is required'
        );
    });

    test('should return true when comparing two equal descriptions', () => {
        const samedescription1 = new DescriptionValueObject('Test description');
        const samedescription2 = new DescriptionValueObject('Test description');
        expect(samedescription1.equals(samedescription2)).toBe(true);
    });

    test('should return false when comparing two different descriptions', () => {
        expect(description1.equals(description2)).toBe(false);
    });

    test('should return the description as a string', () => {
        expect(description1.toString()).toBe('Test description');
    });
});
