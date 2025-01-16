import { describe, expect, test } from 'bun:test';
import { pDCPBRResourceUrlRules } from './resource-url.rules';

describe('Resource url business rules', () => {
    test('should return true for a valid url', () => {
        const validUrlList = [
            'http://example.com',
            'example.com',
            'https://example.org',
            'https://sub.example.com',
            'https://a.b.c.example.co.uk',
            'https://user:pass@example.com',
            'http://admin:1234@secure.site.org',
            'http://example.com:8080',
            'https://secure.site.org:3000',
            'https://example.com/path/to/resource',
            'http://example.org/assets/images/logo.png',
            'https://example.com/search?q=regex',
            'http://example.net/api/v1/resource?key=value&sort=asc',
            'https://example.com/page#section1',
            'http://example.org/article#comments',
            'http://192.168.0.1',
            'https://10.0.0.1:443/path',
            'http://localhost',
            'https://localhost:8080/api',
            'https://user:pass@192.168.1.1:8080/path/to/resource?query=1#anchor',
            'http://admin:admin@example.com:8080/path?debug=true#info',
        ];

        validUrlList.forEach((url) => {
            expect(pDCPBRResourceUrlRules.isValid(url)).toBe(true);
        });
    });

    test('should return false for an invalid url', () => {
        expect(pDCPBRResourceUrlRules.isValid(null)).toBe(false);
        expect(pDCPBRResourceUrlRules.isValid(undefined)).toBe(false);
        expect(pDCPBRResourceUrlRules.isValid('ahttp://example.com')).toBe(false);
    });

    test('should return correct error message textError', () => {
        const expectedErrorMessage = 'The url of resource is required and it must be valid';
        expect(pDCPBRResourceUrlRules.textError()).toBe(expectedErrorMessage);
    });

    test('should return that the url is always required', () => {
        expect(pDCPBRResourceUrlRules.isRequired).toBe(true);
    });
});
