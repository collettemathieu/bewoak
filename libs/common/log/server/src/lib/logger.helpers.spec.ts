import { describe, expect, test } from 'bun:test';
import { attributes } from './logger.helpers';

describe('attributes helper', () => {
    test('should handle string parameters correctly', () => {
        const result = attributes('key1', 'key2');
        expect(result).toEqual({
            'attr-key1': 'key1',
            'attr-key2': 'key2',
        });
    });

    test('should handle object parameters correctly', () => {
        const result = attributes({ key1: 'value1' }, { key2: 'value2' });
        expect(result).toEqual({
            key1: 'value1',
            key2: 'value2',
        });
    });

    test('should handle mixed string and object parameters correctly', () => {
        const result = attributes('key1', { key2: 'value2' }, 'key3');
        expect(result).toEqual({
            'attr-key1': 'key1',
            'attr-key3': 'key3',
            key2: 'value2',
        });
    });

    test('should return an empty object when no parameters are provided', () => {
        const result = attributes();
        expect(result).toEqual({});
    });

    test('should handle boolean and number values correctly', () => {
        const result = attributes({ key1: true, key2: 42 });
        expect(result).toEqual({
            key1: true,
            key2: 42,
        });
    });
});
