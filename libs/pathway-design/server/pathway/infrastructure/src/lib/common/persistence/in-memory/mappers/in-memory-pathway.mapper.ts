import {
    type PDSPBEPathwayEntity,
    PDSPBFpathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import { InMemoryPathwayEntity } from '../entities/in-memory-pathway.entity';

export const mapPathwayToPersistenceInMemory = (
    pathway: PDSPBEPathwayEntity
): InMemoryPathwayEntity => {
    const inMemoryPathwayEntity = new InMemoryPathwayEntity(
        pathway.id?.value ?? '',
        pathway.description?.value ?? '',
        pathway.researchField?.value ?? '',
        pathway.title?.value ?? ''
    );

    return inMemoryPathwayEntity;
};

export const mapPathwayInMemoryToDomain = (
    inMemoryPathwayEntity: InMemoryPathwayEntity
): PDSPBEPathwayEntity => {
    const pathway = PDSPBFpathwayFactory({
        description: inMemoryPathwayEntity.description,
        id: inMemoryPathwayEntity.id,
        researchField: inMemoryPathwayEntity.researchField,
        title: inMemoryPathwayEntity.title,
    });

    return pathway;
};
