import { successValue } from '@bewoak/common-types-result';
import { PathwayEntity } from '../../../../../models/entities/pathway';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (pathway: PathwayEntity) => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.createdAt,
        pathway.description,
        pathway.pathwayId,
        pathway.researchField,
        pathway.title,
        pathway.updatedAt
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (pathwayInMemoryEntity: PathwayInMemoryEntity) => {
    const pathwayEntityResult = PathwayEntity.create({
        createdAt: pathwayInMemoryEntity.createdAt,
        description: pathwayInMemoryEntity.description,
        pathwayId: pathwayInMemoryEntity.pathwayId,
        researchField: pathwayInMemoryEntity.researchField,
        title: pathwayInMemoryEntity.title,
        updatedAt: pathwayInMemoryEntity.updatedAt,
    });

    return successValue(pathwayEntityResult);
};
