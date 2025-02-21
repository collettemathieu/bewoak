import { failure, success } from '@bewoak/common-tools-types-result';
import type { PDSPBEPathwayEntity, PDSPBPInitializePathwayPersistence } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
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

        const pathwayInMemory = await this.pathwayInMemoryRepository.getByPathwayId(peristenceModel.pathwayId);

        if (pathwayInMemory === undefined) {
            return failure('Pathway was not been added in memory');
        }

        return success(mapPathwayInMemoryToPathwayEntity(pathwayInMemory));
    }
}
