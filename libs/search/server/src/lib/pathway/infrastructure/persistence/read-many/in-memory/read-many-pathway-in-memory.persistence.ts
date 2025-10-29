import { ErrorLog, TraceSpan } from '@bewoak/common-o11y-server';
import { success } from '@bewoak/common-types-result';
import { Inject, Injectable } from '@nestjs/common';
import type { PathwayEntity } from '../../../../models/entities/pathway';
import type { ReadManyPathwayPersistence } from '../../../../models/ports/persistences/read-many/read-many-pathway-persitence.port';
import { mapPathwayInMemoryToPathwayEntity } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class ReadManyPathwayInMemoryPersistence implements ReadManyPathwayPersistence {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    @ErrorLog()
    @TraceSpan()
    async readMany() {
        const pathwayInMemoryList = await this.pathwayInMemoryRepository.getAll();
        const pathwayList: PathwayEntity[] = pathwayInMemoryList.map((pathwayInMemory) =>
            mapPathwayInMemoryToPathwayEntity(pathwayInMemory)
        );

        return success(pathwayList);
    }
}
