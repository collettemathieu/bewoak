import { beforeAll, describe, expect, test } from 'bun:test';
import { TitleValueObjects } from './title.value-object';

describe('TitleValueObjects', () => {
    let title1: TitleValueObjects;
    let title2: TitleValueObjects;

    beforeAll(() => {
        title1 = new TitleValueObjects('Test Title');
        title2 = new TitleValueObjects('Different Title');
    });

    test('should create an instance with a valid title', () => {
        const title = new TitleValueObjects('Test Title');
        expect(title.value).toBe('Test Title');
    });

    test('should throw an error if the title is empty', () => {
        expect(() => new TitleValueObjects('')).toThrowError(
            'Title is required'
        );
    });

    test('should return true when comparing two equal titles', () => {
        const sameTitle1 = new TitleValueObjects('Test Title');
        const sameTitle2 = new TitleValueObjects('Test Title');
        expect(sameTitle1.equals(sameTitle2)).toBe(true);
    });

    test('should return false when comparing two different titles', () => {
        expect(title1.equals(title2)).toBe(false);
    });

    test('should return the title as a string', () => {
        expect(title1.toString()).toBe('Test Title');
    });
});
