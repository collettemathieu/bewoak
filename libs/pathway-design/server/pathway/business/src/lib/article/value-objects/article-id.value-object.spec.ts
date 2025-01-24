import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRArticleIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { ArticleIdValueObject } from './article-id.value-object';

describe('ArticleIdValueObject', () => {
    let articleIdValueObject1: ArticleIdValueObject;
    let articleIdValueObject2: ArticleIdValueObject;
    let articleIdValueObjectSameAs2: ArticleIdValueObject;

    beforeAll(() => {
        articleIdValueObject1 = new ArticleIdValueObject('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
        articleIdValueObject2 = new ArticleIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
        articleIdValueObjectSameAs2 = new ArticleIdValueObject('7324ec70-2c17-4dac-ae10-b9eb4cd22fec');
    });

    test('should create an instance with a valid article id', () => {
        expect(articleIdValueObject1.value).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
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
        expect(articleIdValueObject1.toString()).toBe('e24054b9-92ca-4a22-be67-cf14cc94e6f8');
    });
});
