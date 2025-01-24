import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRPathwayIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayIdValueObject } from './pathway-id.value-object';

describe('PathwayIdValueObject', () => {
    let pathwayIdValueObject1: PathwayIdValueObject;
    let pathwayIdValueObject2: PathwayIdValueObject;
    let pathwayIdValueObjectSameAs2: PathwayIdValueObject;

    beforeAll(() => {
        pathwayIdValueObject1 = new PathwayIdValueObject('019499fa-989d-79cc-ab73-3b7bd4b476eb');
        pathwayIdValueObject2 = new PathwayIdValueObject('019499fa-bc83-770f-8526-9bd418660952');
        pathwayIdValueObjectSameAs2 = new PathwayIdValueObject('019499fa-bc83-770f-8526-9bd418660952');
    });

    test('should create an instance with a valid pathway id', () => {
        expect(pathwayIdValueObject1.value).toBe('019499fa-989d-79cc-ab73-3b7bd4b476eb');
    });

    test('should throw an error if the pathway id is invalid', () => {
        expect(() => new PathwayIdValueObject('12345')).toThrowError(pDCPBRPathwayIdRules.textError());
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
