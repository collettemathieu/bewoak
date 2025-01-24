import { beforeAll, describe, expect, test } from 'bun:test';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';
import { PathwayTitleValueObject } from './pathway-title.value-object';

describe('PathwayTitleValueObject', () => {
    let title1: PathwayTitleValueObject;
    let title2: PathwayTitleValueObject;

    beforeAll(() => {
        title1 = new PathwayTitleValueObject('Test Title');
        title2 = new PathwayTitleValueObject('Different Title');
    });

    test('should create an instance with a valid title', () => {
        const title = new PathwayTitleValueObject('Test Title');
        expect(title.value).toBe('Test Title');
    });

    test('should throw an error if the title is not valid', () => {
        expect(() => new PathwayTitleValueObject('')).toThrowError(pDCPBRPathwayTitleRules.textError());
    });

    test('should return true when comparing two equal titles', () => {
        const sameTitle1 = new PathwayTitleValueObject('Test Title');
        const sameTitle2 = new PathwayTitleValueObject('Test Title');
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different titles', () => {
        expect(title1.equals(title2)).toBe(false);
    });

    test('should return the title as a string', () => {
        expect(title1.toString()).toBe('Test Title');
    });
});
