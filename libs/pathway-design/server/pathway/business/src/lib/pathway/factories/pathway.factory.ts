import type { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import type { Result } from '@bewoak/common-types-result';
import { uuidv7 } from 'uuidv7';
import { PDSPBEPathwayEntity } from '../entities/pathway';
import type { PathwayFactoryParams } from './pathway.factory.types';

export const pDSPBFPathwayFactory = ({
    description,
    pathwayId,
    researchField,
    title,
}: PathwayFactoryParams): Result<PDSPBEPathwayEntity, CTSEBadRequestException> => {
    const pathway = new PDSPBEPathwayEntity();
    const uuid = pathwayId ?? uuidv7();

    return pathway.initialize({
        pathwayId: uuid,
        title,
        description,
        researchField,
    });
};
