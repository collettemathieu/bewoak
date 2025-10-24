import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRArticleIdRules } from '@bewoak/pathway-design-common-pathway';
import { ArticleIdValueObject } from './article-id.value-object';

describe('ArticleIdValueObject', () => {
    let articleIdValueObject1: ArticleIdValueObject;
    let articleIdValueObject2: ArticleIdValueObject;
    let articleIdValueObjectSameAs2: ArticleIdValueObject;

    beforeAll(() => {
        articleIdValueObject1 = new ArticleIdValueObject('019499fa-f8b4-7459-a52b-09d7ebf39d4f');
        articleIdValueObject2 = new ArticleIdValueObject('019499fb-18ef-758d-a6ad-5d951ce02ecc');
        articleIdValueObjectSameAs2 = new ArticleIdValueObject('019499fb-18ef-758d-a6ad-5d951ce02ecc');
    });

    test('should create an instance with a valid article id', () => {
        expect(articleIdValueObject1.value).toBe('019499fa-f8b4-7459-a52b-09d7ebf39d4f');
    });

    test('should throw an error if the article id is invalid', () => {
        expect(() => new ArticleIdValueObject('12345')).toThrowError(pDCPBRArticleIdRules.textError());
    });

    test('should return true when comparing two equal article id', () => {
        expect(articleIdValueObject2.equals(articleIdValueObjectSameAs2)).toBe(true);
    });

    test('should return false when comparing two different article id', () => {
        expect(articleIdValueObject1.equals(articleIdValueObject2)).toBe(false);
    });

    test('should return the article id as a string', () => {
        expect(articleIdValueObject1.toString()).toBe('019499fa-f8b4-7459-a52b-09d7ebf39d4f');
    });
});
