import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRArticleTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { ArticleTitleValueObject } from './article-title.value-object';

describe('ArticleTitleValueObject', () => {
    let title1: ArticleTitleValueObject;
    let title2: ArticleTitleValueObject;

    beforeAll(() => {
        title1 = new ArticleTitleValueObject('Test Title');
        title2 = new ArticleTitleValueObject('Different Title');
    });

    test('should create an instance with a valid title', () => {
        const title = new ArticleTitleValueObject('Test Title');
        expect(title.value).toBe('Test Title');
    });

    test('should throw an error if the title is not valid', () => {
        expect(() => new ArticleTitleValueObject('')).toThrowError(pDCPBRArticleTitleRules.textError());
    });

    test('should return true when comparing two equal titles', () => {
        const sameTitle1 = new ArticleTitleValueObject('Test Title');
        const sameTitle2 = new ArticleTitleValueObject('Test Title');
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different titles', () => {
        expect(title1.equals(title2)).toBe(false);
    });

    test('should return the title as a string', () => {
        expect(title1.toString()).toBe('Test Title');
    });
});
