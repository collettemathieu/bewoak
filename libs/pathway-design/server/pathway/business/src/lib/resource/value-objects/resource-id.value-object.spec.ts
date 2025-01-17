import { pDCPBRResourceIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { beforeAll, describe, expect, test } from 'bun:test';
import { ResourceIdValueObject } from './resource-id.value-object';

describe('ResourceIdValueObject', () => {
    let resourceIdValueObject1: ResourceIdValueObject;
    let resourceIdValueObject2: ResourceIdValueObject;
    let resourceIdValueObjectSameAs2: ResourceIdValueObject;

    beforeAll(() => {
        resourceIdValueObject1 = new ResourceIdValueObject('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
        resourceIdValueObject2 = new ResourceIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
        resourceIdValueObjectSameAs2 = new ResourceIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
    });

    test('should create an instance with a valid resource id', () => {
        expect(resourceIdValueObject1.value).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
    });

    test('should throw an error if the resource id is invalid', () => {
        expect(() => new ResourceIdValueObject('12345')).toThrowError(pDCPBRResourceIdRules.textError());
    });

    test('should return true when comparing two equal resource id', () => {
        expect(resourceIdValueObject2.equals(resourceIdValueObjectSameAs2)).toBe(true);
    });

    test('should return false when comparing two different resource id', () => {
        expect(resourceIdValueObject1.equals(resourceIdValueObject2)).toBe(false);
    });

    test('should return the resource id as a string', () => {
        expect(resourceIdValueObject1.toString()).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
    });
});
