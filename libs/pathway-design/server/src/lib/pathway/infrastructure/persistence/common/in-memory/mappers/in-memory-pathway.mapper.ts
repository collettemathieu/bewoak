import { successValue } from '@bewoak/common-types-result';
import type { PathwayEntity } from '../../../../../business/pathway/entities/pathway';
import { pathwayFactory } from '../../../../../business/pathway/factories/pathway.factory';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (pathway: PathwayEntity) => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.description,
        pathway.pathwayId,
        pathway.researchField,
        pathway.title
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (pathwayInMemoryEntity: PathwayInMemoryEntity) => {
    const pathway = pathwayFactory({
        description: pathwayInMemoryEntity.description,
        pathwayId: pathwayInMemoryEntity.pathwayId,
        researchField: pathwayInMemoryEntity.researchField,
        title: pathwayInMemoryEntity.title,
    });

    return successValue(pathway);
};
