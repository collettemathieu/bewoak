import { beforeAll, describe, expect, test } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { pDCPBRPathwayResearchFieldRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayResearchFieldValueObject } from './pathway-research-field.value-object';

describe('PathwayResearchFieldValueObject', () => {
    let researchField1: PathwayResearchFieldValueObject;
    let researchField2: PathwayResearchFieldValueObject;

    beforeAll(() => {
        researchField1 = successValue(PathwayResearchFieldValueObject.create('Test researchField'));
        researchField2 = successValue(PathwayResearchFieldValueObject.create('Different researchField'));
    });

    test('should create an instance with a valid researchField', () => {
        const researchField = successValue(PathwayResearchFieldValueObject.create('Test researchField'));
        expect(researchField.value).toBe('Test researchField');
    });

    test('should generate an error if the researchField is invalid', () => {
        const failure = failureValue(PathwayResearchFieldValueObject.create(''));
        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(pDCPBRPathwayResearchFieldRules.textError());
    });

    test('should return true when comparing two equal researchFields', () => {
        const sameresearchField1 = successValue(PathwayResearchFieldValueObject.create('Test researchField'));
        const sameresearchField2 = successValue(PathwayResearchFieldValueObject.create('Test researchField'));
        expect(sameresearchField1.equals(sameresearchField2)).toBe(true);
    });

    test('should return false when comparing two different researchFields', () => {
        expect(researchField1.equals(researchField2)).toBe(false);
    });

    test('should return the researchField as a string', () => {
        expect(researchField1.toString()).toBe('Test researchField');
    });
});
