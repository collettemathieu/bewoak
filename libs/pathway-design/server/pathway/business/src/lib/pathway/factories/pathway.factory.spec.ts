import { describe, expect, it } from 'bun:test';
import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, successValue } from '@bewoak/common-types-result';
import { PDSPBEPathwayEntity } from '../entities/pathway';
import { pDSPBFPathwayFactory } from './pathway.factory';
import type { PathwayFactoryParams } from './pathway.factory.types';

describe('pDSPBFPathwayFactory', () => {
    it('should initialize a pathway with valid data', () => {
        const params: PathwayFactoryParams = {
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            title: 'My Pathway',
            description: 'A test pathway',
            researchField: 'biology',
        };
        const pathway = successValue(pDSPBFPathwayFactory(params));

        expect(pathway).toBeInstanceOf(PDSPBEPathwayEntity);
        expect(pathway.pathwayId).toBe(params.pathwayId as string);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });

    it('should generate a valid UUID if none is provided', () => {
        const params: PathwayFactoryParams = {
            title: 'My Pathway',
            description: 'A test pathway',
            researchField: 'biology',
        };
        const pathway = successValue(pDSPBFPathwayFactory(params));

        expect(pathway).toBeInstanceOf(PDSPBEPathwayEntity);
        expect(pathway.pathwayId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });

    it('should return a failure when description is invalid', () => {
        const params: PathwayFactoryParams = {
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            title: 'My Pathway',
            description: '',
            researchField: 'biology',
        };
        const failure = failureValue(pDSPBFPathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe('Invalid pathway data');
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when title is invalid', () => {
        const params: PathwayFactoryParams = {
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            title: '',
            description: 'A test pathway',
            researchField: 'biology',
        };
        const failure = failureValue(pDSPBFPathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe('Invalid pathway data');
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when researchField is invalid', () => {
        const params: PathwayFactoryParams = {
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            title: 'My Pathway',
            description: 'A test pathway',
            researchField: '',
        };
        const failure = failureValue(pDSPBFPathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe('Invalid pathway data');
        expect(failure.errors).toHaveLength(1);
    });

    it('should return a failure when all fields are invalid', () => {
        const params: PathwayFactoryParams = {
            pathwayId: '019499fb-7b30-798f-8b2b-ee263081005b',
            title: '',
            description: '',
            researchField: '',
        };
        const failure = failureValue(pDSPBFPathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe('Invalid pathway data');
        expect(failure.errors).toHaveLength(3);
    });

    it('should return a failure when all fields are invalid and no pathwayId is provided', () => {
        const params: PathwayFactoryParams = {
            title: '',
            description: '',
            researchField: '',
        };
        const failure = failureValue(pDSPBFPathwayFactory(params));

        expect(failure).toBeInstanceOf(CTSEBadRequestException);
        expect(failure.message).toBe('Invalid pathway data');
        expect(failure.errors).toHaveLength(3);
    });
});
