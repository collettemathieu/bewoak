import { CTSEInternalServerException, CTSENotFoundRequestException } from '@bewoak/common-http-exceptions-server';
import { ErrorLog } from '@bewoak/common-log-server';
import { failure, success } from '@bewoak/common-types-result';
import type { PDSPBEPathwayEntity, PDSPBPChangeTitlePathwayPersistence } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import {
    PATHWAY_NOT_FOUND_IN_MEMORY,
    PATHWAY_TITLE_NOT_CHANGED_IN_MEMORY,
} from '../../common/in-memory/constants/in-memory-pathway.constants';
import { mapPathwayInMemoryToPathwayEntity } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class ChangeTitlePathwayInMemoryPersistence implements PDSPBPChangeTitlePathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    async getPathwayByPathwayId(pathwayId: string) {
        const pathway = await this.pathwayInMemoryRepository.getByPathwayId(pathwayId);

        if (pathway === undefined) {
            return failure(new CTSENotFoundRequestException(PATHWAY_NOT_FOUND_IN_MEMORY));
        }

        return success(mapPathwayInMemoryToPathwayEntity(pathway));
    }

    @ErrorLog()
    async changeTitle(pathway: PDSPBEPathwayEntity) {
        const pathwayInMemory = await this.pathwayInMemoryRepository.patch(pathway.pathwayId, { title: pathway.title });

        if (pathwayInMemory === undefined) {
            return failure(new CTSENotFoundRequestException(PATHWAY_NOT_FOUND_IN_MEMORY));
        }

        if (pathwayInMemory.title !== pathway.title) {
            return failure(new CTSEInternalServerException(PATHWAY_TITLE_NOT_CHANGED_IN_MEMORY));
        }

        return success(pathway);
    }
}
