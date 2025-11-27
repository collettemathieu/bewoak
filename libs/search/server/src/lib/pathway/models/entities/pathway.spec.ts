import { beforeAll, describe, expect, test } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { PathwayEntity } from './pathway';
import { PATHWAY_ERROR_MESSAGES } from './pathway.constants';
import type { PathwayEntityProps } from './pathway.types';

describe('PathwayEntity', () => {
    let validPathwayData: PathwayEntityProps;

    beforeAll(() => {
        const now = new Date();
        const earlier = new Date(now.getTime() - 60000); // 1 minute earlier

        validPathwayData = {
            createdAt: earlier,
            description: 'Test pathway description',
            pathwayId: 'pathway-123',
            researchField: 'Computer Science',
            title: 'Test Pathway Title',
            updatedAt: now,
        };
    });

    test('should create an instance with valid data', () => {
        const pathway = successValue(PathwayEntity.create(validPathwayData));

        expect(pathway.createdAt).toBe(validPathwayData.createdAt);
        expect(pathway.description).toBe(validPathwayData.description);
        expect(pathway.pathwayId).toBe(validPathwayData.pathwayId);
        expect(pathway.researchField).toBe(validPathwayData.researchField);
        expect(pathway.title).toBe(validPathwayData.title);
        expect(pathway.updatedAt).toBe(validPathwayData.updatedAt);
    });

    test('should generate an error if createdAt is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.createdAt = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.CREATED_AT_REQUIRED);
    });

    test('should generate an error if createdAt is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.createdAt = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.CREATED_AT_REQUIRED);
    });

    test('should generate an error if description is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.description = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.DESCRIPTION_REQUIRED);
    });

    test('should generate an error if description is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.description = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.DESCRIPTION_REQUIRED);
    });

    test('should generate an error if description is empty string', () => {
        const invalidData = { ...validPathwayData, description: '' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.DESCRIPTION_REQUIRED);
    });

    test('should generate an error if description is only whitespace', () => {
        const invalidData = { ...validPathwayData, description: '   ' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.DESCRIPTION_REQUIRED);
    });

    test('should generate an error if researchField is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.researchField = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.RESEARCH_FIELD_REQUIRED);
    });

    test('should generate an error if researchField is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.researchField = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.RESEARCH_FIELD_REQUIRED);
    });

    test('should generate an error if researchField is empty string', () => {
        const invalidData = { ...validPathwayData, researchField: '' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.RESEARCH_FIELD_REQUIRED);
    });

    test('should generate an error if researchField is only whitespace', () => {
        const invalidData = { ...validPathwayData, researchField: '   ' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.RESEARCH_FIELD_REQUIRED);
    });

    test('should generate an error if pathwayId is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.pathwayId = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.PATHWAY_ID_REQUIRED);
    });

    test('should generate an error if pathwayId is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.pathwayId = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.PATHWAY_ID_REQUIRED);
    });

    test('should generate an error if pathwayId is empty string', () => {
        const invalidData = { ...validPathwayData, pathwayId: '' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.PATHWAY_ID_REQUIRED);
    });

    test('should generate an error if pathwayId is only whitespace', () => {
        const invalidData = { ...validPathwayData, pathwayId: '   ' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.PATHWAY_ID_REQUIRED);
    });

    test('should generate an error if title is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.title = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.TITLE_REQUIRED);
    });

    test('should generate an error if title is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.title = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.TITLE_REQUIRED);
    });

    test('should generate an error if title is empty string', () => {
        const invalidData = { ...validPathwayData, title: '' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.TITLE_REQUIRED);
    });

    test('should generate an error if title is only whitespace', () => {
        const invalidData = { ...validPathwayData, title: '   ' };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.TITLE_REQUIRED);
    });

    test('should generate an error if updatedAt is undefined', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing undefined value
        invalidData.updatedAt = undefined;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.UPDATED_AT_REQUIRED);
    });

    test('should generate an error if updatedAt is null', () => {
        const invalidData = { ...validPathwayData };
        // @ts-expect-error Testing null value
        invalidData.updatedAt = null;
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.UPDATED_AT_REQUIRED);
    });

    test('should generate an error if createdAt is later than updatedAt', () => {
        const now = new Date();
        const later = new Date(now.getTime() + 60000); // 1 minute later

        const invalidData = {
            ...validPathwayData,
            createdAt: later,
            updatedAt: now,
        };
        const failure = failureValue(PathwayEntity.create(invalidData));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(PATHWAY_ERROR_MESSAGES.CREATED_AT_CANNOT_BE_LATER_THAN_UPDATED_AT);
    });

    test('should accept equal createdAt and updatedAt dates', () => {
        const now = new Date();
        const validData = {
            ...validPathwayData,
            createdAt: now,
            updatedAt: now,
        };

        const pathway = successValue(PathwayEntity.create(validData));
        expect(pathway.createdAt).toBe(now);
        expect(pathway.updatedAt).toBe(now);
    });
});
