import { beforeAll, describe, expect, test } from 'bun:test';
import { PDSPBVOTitleValueObjects } from './title.value-object';

describe('PDSPBVOTitleValueObjects', () => {
    let title1: PDSPBVOTitleValueObjects;
    let title2: PDSPBVOTitleValueObjects;

    beforeAll(() => {
        title1 = new PDSPBVOTitleValueObjects('Test Title');
        title2 = new PDSPBVOTitleValueObjects('Different Title');
    });

    test('should create an instance with a valid title', () => {
        const title = new PDSPBVOTitleValueObjects('Test Title');
        expect(title.value).toBe('Test Title');
    });

    test('should throw an error if the title is empty', () => {
        expect(() => new PDSPBVOTitleValueObjects('')).toThrowError(
            'Title is required'
        );
    });

    test('should return true when comparing two equal titles', () => {
        const sameTitle1 = new PDSPBVOTitleValueObjects('Test Title');
        const sameTitle2 = new PDSPBVOTitleValueObjects('Test Title');
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different titles', () => {
        expect(title1.equals(title2)).toBe(false);
    });

    test('should return the title as a string', () => {
        expect(title1.toString()).toBe('Test Title');
    });
});
