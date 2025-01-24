import type { PDSPBEPathwayEntity, PDSPBPInitializePathwayPersistence } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    mapPathwayEntityToInMemoryPersistence,
    mapPathwayInMemoryToPathwayEntity,
} from '../../../persistence/common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../../persistence/common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class InitializePathwayInMemoryPersistence implements PDSPBPInitializePathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    async save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(pDSPBEPathwayEntity);
        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.get(peristenceModel.id);

        if (pathwayInMemory === undefined) {
            throw new NotFoundException('Pathway not found in memory');
        }

        return mapPathwayInMemoryToPathwayEntity(pathwayInMemory);
    }
}
