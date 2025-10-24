import { PathwayEntity } from '../../../../../models/entities/pathway';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (pathway: PathwayEntity): PathwayInMemoryEntity => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.description,
        pathway.id,
        pathway.researchField,
        pathway.title
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (pathwayInMemoryEntity: PathwayInMemoryEntity): PathwayEntity => {
    const pathway = new PathwayEntity(
        pathwayInMemoryEntity.description,
        pathwayInMemoryEntity.id,
        pathwayInMemoryEntity.researchField,
        pathwayInMemoryEntity.title
    );

    return pathway;
};
