import { CTSENotFoundRequestException } from '@bewoak/common-http-exceptions-server';
import { ErrorLog } from '@bewoak/common-log-server';
import { failure, success } from '@bewoak/common-types-result';
import type { PDSPBPChangeTitlePathwayPersistence } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable } from '@nestjs/common';
import { mapPathwayInMemoryToPathwayEntity } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class ChangeTitlePathwayInMemoryPersistence implements PDSPBPChangeTitlePathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    async changeTitle(pathwayId: string, title: string) {
        const pathwayInMemory = await this.pathwayInMemoryRepository.patch(pathwayId, { title });

        if (pathwayInMemory === undefined) {
            return failure(new CTSENotFoundRequestException('Pathway not found in memory'));
        }

        return success(mapPathwayInMemoryToPathwayEntity(pathwayInMemory));
    }
}
