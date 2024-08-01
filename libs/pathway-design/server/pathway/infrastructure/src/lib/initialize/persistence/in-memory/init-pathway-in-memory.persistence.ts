import type {
    PDSPBEPathwayEntity,
    PDSPBPInitPathwayMemoryPort,
} from '@bewoak/pathway-design-server-pathway-business';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import {
    mapPathwayInMemoryToDomain,
    mapPathwayToPersistenceInMemory,
} from '../../../common/persistence/in-memory/mappers/in-memory-pathway.mapper';
import { InMemoryPathwayRepository } from '../../../common/persistence/in-memory/repositories/in-memory-pathway.repository';

@Injectable()
export class PDIIPPInitPathwayInMemory implements PDSPBPInitPathwayMemoryPort {
    constructor(
        @Inject(InMemoryPathwayRepository)
        private inMemoryPathwayRepository: InMemoryPathwayRepository
    ) {}

    save(PDSPBEpathwayEntity: PDSPBEPathwayEntity) {
        const peristenceModel =
            mapPathwayToPersistenceInMemory(PDSPBEpathwayEntity);
        this.inMemoryPathwayRepository.add(peristenceModel);

        const pathwayInMemory = this.inMemoryPathwayRepository.get(
            peristenceModel.id
        );

        if (pathwayInMemory === undefined) {
            throw new NotFoundException('Pathway not found in memory');
        }

        const newPathway = mapPathwayInMemoryToDomain(pathwayInMemory);

        return of(newPathway);
    }
}
