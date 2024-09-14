import type { PDSPBPChangeTitlePathwayPersistencePort } from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { mapPathwayInMemoryToPathwayEntity } from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class ChangeTitlePathwayInMemoryPersistence implements PDSPBPChangeTitlePathwayPersistencePort {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    async changeTitle(pathwayId: string, title: string) {
        try {
            await this.pathwayInMemoryRepository.patch(pathwayId, { title });
        } catch (error) {
            throw new NotFoundException(`An error has occurred while changing the title of the pathway: ${error}`);
        }

        const pathwayInMemory = await this.pathwayInMemoryRepository.get(pathwayId);

        if (pathwayInMemory === undefined) {
            throw new NotFoundException('Pathway not found in memory');
        }

        return mapPathwayInMemoryToPathwayEntity(pathwayInMemory);
    }
}
