import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRResourceIdRules } from '@bewoak/pathway-design-common-pathway';
import { ResourceIdValueObject } from './resource-id.value-object';

describe('ResourceIdValueObject', () => {
    let resourceIdValueObject1: ResourceIdValueObject;
    let resourceIdValueObject2: ResourceIdValueObject;
    let resourceIdValueObjectSameAs2: ResourceIdValueObject;

    beforeAll(() => {
        resourceIdValueObject1 = new ResourceIdValueObject('019499f9-812d-7e22-84ca-fc22da1765db');
        resourceIdValueObject2 = new ResourceIdValueObject('019499fa-2794-7460-ba23-5824bdc41522');
        resourceIdValueObjectSameAs2 = new ResourceIdValueObject('019499fa-2794-7460-ba23-5824bdc41522');
    });

    test('should create an instance with a valid resource id', () => {
        expect(resourceIdValueObject1.value).toBe('019499f9-812d-7e22-84ca-fc22da1765db');
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
        expect(resourceIdValueObject1.toString()).toBe('019499f9-812d-7e22-84ca-fc22da1765db');
    });
});
