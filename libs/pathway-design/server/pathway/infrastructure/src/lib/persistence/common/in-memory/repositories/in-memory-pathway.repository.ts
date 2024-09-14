import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';
import type { PathwayInMemoryPatchParameters } from '../types/in-memory-pathway.types';

export class PathwayInMemoryRepository {
    #pathways = new Map<string, PathwayInMemoryEntity>();

    async add(pathwayInMemoryEntity: PathwayInMemoryEntity) {
        this.#pathways.set(pathwayInMemoryEntity.id, pathwayInMemoryEntity);
    }

    async patch(id: string, { description, researchField, title }: PathwayInMemoryPatchParameters) {
        const pathway = this.#pathways.get(id);

        if (pathway === undefined) {
            throw new Error('Pathway not found in memory');
        }

        const newPathway = new PathwayInMemoryEntity(
            description ?? pathway.description,
            id,
            researchField ?? pathway.researchField,
            title ?? pathway.title
        );

        this.#pathways.set(id, newPathway);
    }

    async get(id: string) {
        return this.#pathways.get(id);
    }
}
