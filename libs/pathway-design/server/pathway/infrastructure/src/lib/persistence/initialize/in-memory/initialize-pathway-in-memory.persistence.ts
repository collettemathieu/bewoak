import { CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import { ErrorLog, TraceSpan } from '@bewoak/common-o11y-server';
import { failure, success } from '@bewoak/common-types-result';
import type { PDSPBEPathwayEntity, PDSPBPInitializePathwayPersistence } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import { mapPathwayEntityToInMemoryPersistence } from '../../../persistence/common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../../persistence/common/in-memory/repositories/in-memory-pathway.repository';
import {
    PATHWAY_NOT_ADDED_IN_MEMORY,
    PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY,
} from '../../common/in-memory/constants/in-memory-pathway.constants';
import type { PathwayInMemoryEntity } from '../../common/in-memory/entities/in-memory-pathway.entity';

@Injectable()
export class InitializePathwayInMemoryPersistence implements PDSPBPInitializePathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    @TraceSpan()
    async save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(pDSPBEPathwayEntity);

        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.getByPathwayId(pDSPBEPathwayEntity.pathwayId);

        if (pathwayInMemory === undefined) {
            return failure(new CTSEInternalServerException(PATHWAY_NOT_ADDED_IN_MEMORY));
        }

        if (!this.isPathwayModelEqualToPathwayEntity(pDSPBEPathwayEntity, pathwayInMemory)) {
            return failure(new CTSEInternalServerException(PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY));
        }

        return success(pDSPBEPathwayEntity);
    }

    private isPathwayModelEqualToPathwayEntity(pDSPBEPathwayEntity: PDSPBEPathwayEntity, peristenceModel: PathwayInMemoryEntity) {
        return (
            pDSPBEPathwayEntity.pathwayId === peristenceModel.pathwayId &&
            pDSPBEPathwayEntity.title === peristenceModel.title &&
            pDSPBEPathwayEntity.description === peristenceModel.description &&
            pDSPBEPathwayEntity.researchField === peristenceModel.researchField
        );
    }
}
