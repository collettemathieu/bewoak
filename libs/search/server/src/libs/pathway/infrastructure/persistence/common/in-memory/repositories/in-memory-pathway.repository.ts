import type { PathwayInMemoryEntity } from '../entities/in-memory-pathway.entity';

export class PathwayInMemoryRepository {
    readonly #pathways = new Map<string, PathwayInMemoryEntity>();

    async add(pathwayInMemoryEntity: PathwayInMemoryEntity) {
        this.#pathways.set(pathwayInMemoryEntity.id, pathwayInMemoryEntity);
    }

    async get(id: string) {
        return this.#pathways.get(id);
    }

    async getAll() {
        return this.#pathways.values();
    }
}
