import { describe, expect, it } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { PathwayEntity } from '../entities/pathway';
import { INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE } from '../entities/pathway.constants';
import { pathwayFactory } from './pathway.factory';
import type { PathwayFactoryParams } from './pathway.factory.types';

describe('pathwayFactory', () => {
    it('should initialize a pathway with valid data', () => {
        const params: PathwayFactoryParams = {
            description: 'A test pathway',
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            researchField: 'biology',
            title: 'My Pathway',
        };
        const pathway = successValue(pathwayFactory(params));

        expect(pathway).toBeInstanceOf(PathwayEntity);
        expect(pathway.pathwayId).toBe(params.pathwayId as string);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });

    it('should generate a valid UUID if none is provided', () => {
        const params: PathwayFactoryParams = {
            description: 'A test pathway',
            researchField: 'biology',
            title: 'My Pathway',
        };
        const pathway = successValue(pathwayFactory(params));

        expect(pathway).toBeInstanceOf(PathwayEntity);
        expect(pathway.pathwayId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });

    it('should return a failure when description is invalid', () => {
        const params: PathwayFactoryParams = {
            description: '',
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            researchField: 'biology',
            title: 'My Pathway',
        };
        const failure = failureValue(pathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when title is invalid', () => {
        const params: PathwayFactoryParams = {
            description: 'A test pathway',
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            researchField: 'biology',
            title: '',
        };
        const failure = failureValue(pathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when researchField is invalid', () => {
        const params: PathwayFactoryParams = {
            description: 'A test pathway',
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            researchField: '',
            title: 'My Pathway',
        };
        const failure = failureValue(pathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when all fields are invalid', () => {
        const params: PathwayFactoryParams = {
            description: '',
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            researchField: '',
            title: '',
        };
        const failure = failureValue(pathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        expect(failure.errors).toHaveLength(3);
    });

    it('should return a failure when all fields are invalid and no pathwayId is provided', () => {
        const params: PathwayFactoryParams = {
            description: '',
            researchField: '',
            title: '',
        };
        const failure = failureValue(pathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe(INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        expect(failure.errors).toHaveLength(3);
    });
});
