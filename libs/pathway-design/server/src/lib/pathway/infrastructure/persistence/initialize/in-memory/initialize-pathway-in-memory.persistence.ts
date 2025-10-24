import { CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import { ErrorLog, TraceSpan } from '@bewoak/common-o11y-server';
import { failure, success } from '@bewoak/common-types-result';
import { Inject, Injectable } from '@nestjs/common';
import type { PathwayEntity } from '../../../../business/pathway/entities/pathway';
import type { InitializePathwayPersistence } from '../../../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import {
    PATHWAY_NOT_ADDED_IN_MEMORY,
    PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY,
} from '../../common/in-memory/constants/in-memory-pathway.constants';
import type { PathwayInMemoryEntity } from '../../common/in-memory/entities/in-memory-pathway.entity';
import { mapPathwayEntityToInMemoryPersistence } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class InitializePathwayInMemoryPersistence implements InitializePathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    @TraceSpan()
    async save(pathwayEntity: PathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(pathwayEntity);

        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.getByPathwayId(pathwayEntity.pathwayId);

        if (pathwayInMemory === undefined) {
            return failure(new CTSEInternalServerException(PATHWAY_NOT_ADDED_IN_MEMORY));
        }

        if (!this.isPathwayModelEqualToPathwayEntity(pathwayEntity, pathwayInMemory)) {
            return failure(new CTSEInternalServerException(PATHWAY_NOT_SAVED_CORRECTLY_IN_MEMORY));
        }

        return success(pathwayEntity);
    }

    private isPathwayModelEqualToPathwayEntity(pathwayEntity: PathwayEntity, peristenceModel: PathwayInMemoryEntity) {
        return (
            pathwayEntity.pathwayId === peristenceModel.pathwayId &&
            pathwayEntity.title === peristenceModel.title &&
            pathwayEntity.description === peristenceModel.description &&
            pathwayEntity.researchField === peristenceModel.researchField
        );
    }
}
