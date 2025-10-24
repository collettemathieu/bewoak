import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRResourceUrlRules } from '@bewoak/pathway-design-common-pathway';
import { ResourceUrlValueObject } from './resource-url.value-object';

describe('ResourceUrlValueObject', () => {
    let url1: ResourceUrlValueObject;
    let url2: ResourceUrlValueObject;

    beforeAll(() => {
        url1 = new ResourceUrlValueObject('http://www.test.com');
        url2 = new ResourceUrlValueObject('http://www.different.com');
    });

    test('should create an instance with a valid url', () => {
        const url = new ResourceUrlValueObject('http://www.test.com');
        expect(url.value).toBe('http://www.test.com');
    });

    test('should throw an error if the url is not valid', () => {
        expect(() => new ResourceUrlValueObject('')).toThrowError(pDCPBRResourceUrlRules.textError());
    });

    test('should return true when comparing two equal urls', () => {
        const sameTitle1 = new ResourceUrlValueObject('http://www.test.com');
        const sameTitle2 = new ResourceUrlValueObject('http://www.test.com');
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different urls', () => {
        expect(url1.equals(url2)).toBe(false);
    });

    test('should return the url as a string', () => {
        expect(url1.toString()).toBe('http://www.test.com');
    });
});
