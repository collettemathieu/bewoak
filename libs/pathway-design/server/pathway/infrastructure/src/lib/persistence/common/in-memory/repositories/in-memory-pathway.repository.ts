import { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';
import type { PathwayInMemoryPatchParameters } from '../types/in-memory-pathway.types';

export class PathwayInMemoryRepository {
    #pathways = new Map<string, PathwayInMemoryEntity>();

    async add(pathwayInMemoryEntity: PathwayInMemoryEntity) {
        const id = this.getNextId();
        pathwayInMemoryEntity.id = id;
        this.#pathways.set(id, pathwayInMemoryEntity);
    }

    async patch(pathwayId: string, { description, researchField, title }: PathwayInMemoryPatchParameters) {
        const pathway = await this.getByPathwayId(pathwayId);

        if (pathway === undefined || pathway.id === undefined) {
            throw new Error('Pathway not found in memory');
        }

        const newPathway = new PathwayInMemoryEntity(
            description ?? pathway.description,
            pathwayId ?? pathway.pathwayId,
            researchField ?? pathway.researchField,
            title ?? pathway.title,
            pathway.id
        );

        this.#pathways.set(pathway.id, newPathway);
    }

    async getById(id: string) {
        return this.#pathways.get(id);
    }

    async getByPathwayId(pathwayId: string) {
        const pathwayList = Array.from(this.#pathways.values());
        const index = pathwayList.findIndex((pathway) => pathway.pathwayId === pathwayId);

        if (index === -1) {
            return undefined;
        }

        const pathway = { id: (index + 1).toString(), ...pathwayList[index] };

        return pathway;
    }

    getNextId() {
        return (this.#pathways.size + 1).toString();
    }
}
