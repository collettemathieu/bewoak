import { beforeAll, describe, expect, test } from 'bun:test';
import { PathwayIdValueObject } from './pathway-id.value-object';

describe('PathwayIdValueObject', () => {
    let pathwayIdValueObject1: PathwayIdValueObject;
    let pathwayIdValueObject2: PathwayIdValueObject;
    let pathwayIdValueObjectSameAs2: PathwayIdValueObject;

    beforeAll(() => {
        pathwayIdValueObject1 = new PathwayIdValueObject('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
        pathwayIdValueObject2 = new PathwayIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
        pathwayIdValueObjectSameAs2 = new PathwayIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
    });

    test('should create an instance with a valid pathway id', () => {
        expect(pathwayIdValueObject1.value).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
    });

    test('should throw an error if the id is not a uuid', () => {
        expect(() => new PathwayIdValueObject('12345')).toThrowError('Pathway id must be a valid uuid');
    });

    test('should return true when comparing two equal pathway id', () => {
        expect(pathwayIdValueObject2.equals(pathwayIdValueObjectSameAs2)).toBe(true);
    });

    test('should return false when comparing two different pathway id', () => {
        expect(pathwayIdValueObject1.equals(pathwayIdValueObject2)).toBe(false);
    });

    test('should return the pathway id as a string', () => {
        expect(pathwayIdValueObject1.toString()).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
    });
});
