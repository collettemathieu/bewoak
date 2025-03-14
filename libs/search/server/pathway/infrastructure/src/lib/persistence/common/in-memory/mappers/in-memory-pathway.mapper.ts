import { SSPMEPathwayEntity } from '@bewoak/search-server-pathway-models';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (pathway: SSPMEPathwayEntity): PathwayInMemoryEntity => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.description,
        pathway.id,
        pathway.researchField,
        pathway.title
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (pathwayInMemoryEntity: PathwayInMemoryEntity): SSPMEPathwayEntity => {
    const pathway = new SSPMEPathwayEntity(
        pathwayInMemoryEntity.description,
        pathwayInMemoryEntity.id,
        pathwayInMemoryEntity.researchField,
        pathwayInMemoryEntity.title
    );

    return pathway;
};
