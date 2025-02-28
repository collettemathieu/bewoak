import { successValue } from '@bewoak/common-types-result';
import { type PDSPBEPathwayEntity, pDSPBFPathwayFactory } from '@bewoak/pathway-design-server-pathway-business';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (pathway: PDSPBEPathwayEntity) => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.description,
        pathway.pathwayId,
        pathway.researchField,
        pathway.title
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (pathwayInMemoryEntity: PathwayInMemoryEntity) => {
    const pathway = pDSPBFPathwayFactory({
        description: pathwayInMemoryEntity.description,
        pathwayId: pathwayInMemoryEntity.pathwayId,
        researchField: pathwayInMemoryEntity.researchField,
        title: pathwayInMemoryEntity.title,
    });

    return successValue(pathway);
};
