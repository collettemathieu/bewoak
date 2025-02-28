import { beforeAll, describe, expect, test } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayTitleValueObject } from './pathway-title.value-object';

describe('PathwayTitleValueObject', () => {
    let title1: PathwayTitleValueObject;
    let title2: PathwayTitleValueObject;

    beforeAll(() => {
        title1 = successValue(PathwayTitleValueObject.create('Test Title'));
        title2 = successValue(PathwayTitleValueObject.create('Different Title'));
    });

    test('should create an instance with a valid title', () => {
        const title = successValue(PathwayTitleValueObject.create('Test Title'));
        expect(title.value).toBe('Test Title');
    });

    test('should generate an error if the title is not valid', () => {
        const failure = failureValue(PathwayTitleValueObject.create(''));
        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(pDCPBRPathwayTitleRules.textError());
    });

    test('should return true when comparing two equal titles', () => {
        const sameTitle1 = successValue(PathwayTitleValueObject.create('Test Title'));
        const sameTitle2 = successValue(PathwayTitleValueObject.create('Test Title'));
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different titles', () => {
        expect(title1.equals(title2)).toBe(false);
    });

    test('should return the title as a string', () => {
        expect(title1.toString()).toBe('Test Title');
    });
});
