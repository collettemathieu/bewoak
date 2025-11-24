import { Inject, Injectable } from '@nestjs/common';
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
        // Pas de contrôle de la data (description = undefined par ex).
        // Pas d'utilisation de createdAt et updatedAt pour l'instant.
        return this.indexPathwayPersistence.index(pathwayData);
    }
}
