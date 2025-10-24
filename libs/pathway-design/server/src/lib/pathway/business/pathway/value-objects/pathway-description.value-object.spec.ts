import { beforeAll, describe, expect, test } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { pDCPBRPathwayDescriptionRules } from '@bewoak/pathway-design-common-pathway';
import { PathwayDescriptionValueObject } from './pathway-description.value-object';

describe('PathwayDescriptionValueObject', () => {
    let description1: PathwayDescriptionValueObject;
    let description2: PathwayDescriptionValueObject;

    beforeAll(() => {
        description1 = successValue(PathwayDescriptionValueObject.create('Test description'));
        description2 = successValue(PathwayDescriptionValueObject.create('Different description'));
    });

    test('should create an instance with a valid description', () => {
        const description = successValue(PathwayDescriptionValueObject.create('Test description'));
        expect(description.value).toBe('Test description');
    });

    test('should generate an error if the description is invalid', () => {
        const failure = failureValue(PathwayDescriptionValueObject.create(''));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(pDCPBRPathwayDescriptionRules.textError());
    });

    test('should return true when comparing two equal descriptions', () => {
        const samedescription1 = successValue(PathwayDescriptionValueObject.create('Test description'));
        const samedescription2 = successValue(PathwayDescriptionValueObject.create('Test description'));
        expect(samedescription1.equals(samedescription2)).toBe(true);
    });

    test('should return false when comparing two different descriptions', () => {
        expect(description1.equals(description2)).toBe(false);
    });

    test('should return the description as a string', () => {
        expect(description1.toString()).toBe('Test description');
    });
});
