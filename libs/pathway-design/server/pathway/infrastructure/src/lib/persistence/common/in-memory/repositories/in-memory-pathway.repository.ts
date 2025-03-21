import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';
import type { PathwayInMemoryPatchParameters } from '../types/in-memory-pathway.types';

export class PathwayInMemoryRepository {
    #pathways = new Map<string, PathwayInMemoryEntity>();
    #indexPathwayByPathwayId = new Map<string, string>();

    async add(pathwayInMemoryEntity: PathwayInMemoryEntity) {
        const id = this.#getNextId();
        pathwayInMemoryEntity.id = id;
        this.#pathways.set(id, pathwayInMemoryEntity);
        this.#indexPathwayByPathwayId.set(pathwayInMemoryEntity.pathwayId, id);
    }

    async patch(pathwayId: string, { description, researchField, title }: PathwayInMemoryPatchParameters) {
        const pathway = await this.getByPathwayId(pathwayId);

        if (pathway === undefined || pathway.id === undefined) {
            return undefined;
        }

        const newPathway = new PathwayInMemoryEntity(
            description ?? pathway.description,
            pathwayId ?? pathway.pathwayId,
            researchField ?? pathway.researchField,
            title ?? pathway.title,
            pathway.id
        );

        this.#pathways.set(pathway.id, newPathway);

        return this.getByPathwayId(pathwayId);
    }

    async getByPathwayId(pathwayId: string) {
        const id = this.#indexPathwayByPathwayId.get(pathwayId);

        if (id === undefined) {
            return undefined;
        }

        const pathway = this.#pathways.get(id);

        return pathway;
    }

    #getNextId() {
        return (this.#pathways.size + 1).toString();
    }
}
