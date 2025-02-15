import { describe, expect, it } from 'bun:test';
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
        const pathway = pDSPBFPathwayFactory(params);

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
        const pathway = pDSPBFPathwayFactory(params);

        expect(pathway).toBeInstanceOf(PDSPBEPathwayEntity);
        expect(pathway.pathwayId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });
});
