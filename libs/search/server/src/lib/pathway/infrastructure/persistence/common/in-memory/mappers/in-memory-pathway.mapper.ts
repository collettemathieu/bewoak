import { PathwayEntity } from '../../../../../models/entities/pathway';
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
    const pathway = new PathwayEntity(
        pathwayInMemoryEntity.description,
        pathwayInMemoryEntity.pathwayId,
        pathwayInMemoryEntity.researchField,
        pathwayInMemoryEntity.title
    );

    return pathway;
};
