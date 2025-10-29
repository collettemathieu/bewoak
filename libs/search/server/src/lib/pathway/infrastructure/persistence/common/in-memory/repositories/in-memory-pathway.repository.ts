import type { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export class PathwayInMemoryRepository {
    #pathways = new Map<string, PathwayInMemoryEntity>();
    #indexPathwayByPathwayId = new Map<string, string>();

    async add(pathwayInMemoryEntity: PathwayInMemoryEntity) {
        const id = this.#getNextId();
        pathwayInMemoryEntity.id = id;
        this.#pathways.set(id, pathwayInMemoryEntity);
        this.#indexPathwayByPathwayId.set(pathwayInMemoryEntity.pathwayId, id);
    }

    async getAll() {
        return Array.from(this.#pathways.values());
    }

    async getByPathwayId(pathwayId: string) {
        const id = this.#indexPathwayByPathwayId.get(pathwayId);
        if (id === undefined) {
            return undefined;
        }
        return this.#pathways.get(id);
    }

    #getNextId() {
        return (this.#pathways.size + 1).toString();
    }
}
