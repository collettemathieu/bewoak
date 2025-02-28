import { beforeAll, describe, expect, test } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { pDCPBRPathwayIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayIdValueObject } from './pathway-id.value-object';

describe('PathwayIdValueObject', () => {
    let pathwayIdValueObject1: PathwayIdValueObject;
    let pathwayIdValueObject2: PathwayIdValueObject;
    let pathwayIdValueObjectSameAs2: PathwayIdValueObject;

    beforeAll(() => {
        pathwayIdValueObject1 = successValue(PathwayIdValueObject.create('019499fa-989d-79cc-ab73-3b7bd4b476eb'));
        pathwayIdValueObject2 = successValue(PathwayIdValueObject.create('019499fa-bc83-770f-8526-9bd418660952'));
        pathwayIdValueObjectSameAs2 = successValue(PathwayIdValueObject.create('019499fa-bc83-770f-8526-9bd418660952'));
    });

    test('should create an instance with a valid pathway id', () => {
        expect(pathwayIdValueObject1.value).toBe('019499fa-989d-79cc-ab73-3b7bd4b476eb');
    });

    test('should generate an error if the pathway id is invalid', () => {
        const failure = failureValue(PathwayIdValueObject.create(''));
        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(pDCPBRPathwayIdRules.textError());
    });

    test('should return true when comparing two equal pathway id', () => {
        expect(pathwayIdValueObject2.equals(pathwayIdValueObjectSameAs2)).toBe(true);
    });

    test('should return false when comparing two different pathway id', () => {
        expect(pathwayIdValueObject1.equals(pathwayIdValueObject2)).toBe(false);
    });

    test('should return the pathway id as a string', () => {
        expect(pathwayIdValueObject1.toString()).toBe('019499fa-989d-79cc-ab73-3b7bd4b476eb');
    });
});
