import type { SSPMEPathwayEntity, SSPMPAddPathwayPersistencePort } from '@bewoak/search-server-pathway-models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    mapPathwayEntityToInMemoryPersistence,
    mapPathwayInMemoryToPathwayEntity,
} from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class AddPathwayInMemoryPersistence implements SSPMPAddPathwayPersistencePort {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    async add(sSPMEPathwayEntity: SSPMEPathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(sSPMEPathwayEntity);
        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.get(peristenceModel.id);

        if (pathwayInMemory === undefined) {
            throw new NotFoundException('Pathway not found in memory');
        }

        return mapPathwayInMemoryToPathwayEntity(pathwayInMemory);
    }
}
