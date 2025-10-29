import { CTSEInternalServerException } from '@bewoak/common-http-exceptions-server';
import { ErrorLog, TraceSpan } from '@bewoak/common-o11y-server';
import { failure, success } from '@bewoak/common-types-result';
import { Inject, Injectable } from '@nestjs/common';
import type { PathwayEntity } from '../../../../models/entities/pathway';
import type { IndexPathwayPersistence } from '../../../../models/ports/persistences/index/index-pathway-persitence.port';
import { PATHWAY_NOT_INDEXED_CORRECTLY_IN_MEMORY } from '../../common/in-memory/constants/in-memory-pathway.constants';
import { mapPathwayEntityToInMemoryPersistence } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class IndexPathwayInMemoryPersistence implements IndexPathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    @TraceSpan()
    async index(pathwayEntity: PathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(pathwayEntity);

        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.getByPathwayId(pathwayEntity.pathwayId);

        if (pathwayInMemory === undefined) {
            return failure(new CTSEInternalServerException(PATHWAY_NOT_INDEXED_CORRECTLY_IN_MEMORY));
        }

        return success(pathwayEntity);
    }
}
