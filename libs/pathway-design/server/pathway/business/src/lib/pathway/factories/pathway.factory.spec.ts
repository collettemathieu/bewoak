import { describe, expect, it } from 'bun:test';
import { PDSPBEPathwayEntity } from '../entities/pathway.entity';
import { pDSPBFPathwayFactory } from './pathway.factory';
import type { PathwayFactoryParams } from './pathway.factory.types';

describe('pDSPBFPathwayFactory', () => {
    it('should initialize a pathway with valid data', () => {
        const params: PathwayFactoryParams = {
            id: 'f7703737-186c-4c7c-8d46-925111c7c7c1',
            title: 'My Pathway',
            description: 'A test pathway',
            researchField: 'biology',
        };
        const pathway = pDSPBFPathwayFactory(params);

        expect(pathway).toBeInstanceOf(PDSPBEPathwayEntity);
        expect(pathway.id).toBe(params.id as string);
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
        expect(pathway.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        expect(pathway.title).toBe(params.title);
        expect(pathway.description).toBe(params.description);
        expect(pathway.researchField).toBe(params.researchField);
    });
});
