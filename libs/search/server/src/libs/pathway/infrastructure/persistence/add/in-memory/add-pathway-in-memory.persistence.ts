import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PathwayEntity } from '../../../../models/entities/pathway';
import type { AddPathwayPersistencePort } from '../../../../models/ports/persistences/add/add-pathway-persitence.port';
import {
    mapPathwayEntityToInMemoryPersistence,
    mapPathwayInMemoryToPathwayEntity,
} from '../../common/in-memory/mappers/in-memory-pathway.mapper';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class AddPathwayInMemoryPersistence implements AddPathwayPersistencePort {
    constructor(
        @Inject(PathwayInMemoryRepository)
        private pathwayInMemoryRepository: PathwayInMemoryRepository
    ) {}

    async add(pathwayEntity: PathwayEntity) {
        const peristenceModel = mapPathwayEntityToInMemoryPersistence(pathwayEntity);
        await this.pathwayInMemoryRepository.add(peristenceModel);

        const pathwayInMemory = await this.pathwayInMemoryRepository.get(peristenceModel.id);

        if (pathwayInMemory === undefined) {
            throw new NotFoundException('Pathway not found in memory');
        }

        return mapPathwayInMemoryToPathwayEntity(pathwayInMemory);
    }
}
