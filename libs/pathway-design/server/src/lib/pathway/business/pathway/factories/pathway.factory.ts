import type { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import type { Result } from '@bewoak/common-types-result';
import { uuidv7 } from 'uuidv7';
import { PathwayEntity } from '../entities/pathway';
import type { PathwayFactoryParams } from './pathway.factory.types';

export const pathwayFactory = ({
    description,
    pathwayId,
    researchField,
    title,
}: PathwayFactoryParams): Result<PathwayEntity, CTSEBadRequestException> => {
    const pathway = new PathwayEntity();
    const uuid = pathwayId ?? uuidv7();

    return pathway.initialize({
        description,
        pathwayId: uuid,
        researchField,
        title,
    });
};
