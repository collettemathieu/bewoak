import {
    type PDSPBEPathwayEntity,
    PDSPBFpathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayEntityToInMemoryPersistence = (
    pathway: PDSPBEPathwayEntity
): PathwayInMemoryEntity => {
    const pathwayInMemoryEntity = new PathwayInMemoryEntity(
        pathway.id?.value ?? '',
        pathway.description?.value ?? '',
        pathway.researchField?.value ?? '',
        pathway.title?.value ?? ''
    );

    return pathwayInMemoryEntity;
};

export const mapPathwayInMemoryToPathwayEntity = (
    pathwayInMemoryEntity: PathwayInMemoryEntity
): PDSPBEPathwayEntity => {
    const pathway = PDSPBFpathwayFactory({
        description: pathwayInMemoryEntity.description,
        id: pathwayInMemoryEntity.id,
        researchField: pathwayInMemoryEntity.researchField,
        title: pathwayInMemoryEntity.title,
    });

    return pathway;
};
