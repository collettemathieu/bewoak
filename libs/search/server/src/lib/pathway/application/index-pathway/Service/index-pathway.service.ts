import { isFailure, successValue } from '@bewoak/common-types-result';
import { Inject, Injectable } from '@nestjs/common';
import { PathwayEntity } from '../../../models/entities/pathway';
import {
    INDEX_PATHWAY_PERSISTENCE,
    type IndexPathwayPersistence,
} from '../../../models/ports/persistences/index/index-pathway-persitence.port';
import type { PathwayIndexData } from './index-pathway.types';

@Injectable()
export class IndexPathwayService {
    constructor(
        @Inject(INDEX_PATHWAY_PERSISTENCE)
        private readonly indexPathwayPersistence: IndexPathwayPersistence
    ) {}

    async indexPathway(pathwayData: PathwayIndexData) {
        const pathwayEntityResult = PathwayEntity.create({
            createdAt: new Date(),
            description: pathwayData.description,
            pathwayId: pathwayData.pathwayId,
            researchField: pathwayData.researchField,
            title: pathwayData.title,
            updatedAt: new Date(),
        });

        if (isFailure(pathwayEntityResult)) {
            return pathwayEntityResult;
        }

        return this.indexPathwayPersistence.index(successValue(pathwayEntityResult));
    }
}
