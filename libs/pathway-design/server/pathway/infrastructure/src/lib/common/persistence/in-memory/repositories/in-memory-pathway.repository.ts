import type { InMemoryPathwayEntity } from '../entities/in-memory-pathway.entity';

export class InMemoryPathwayRepository {
    #pathways = new Map<string, InMemoryPathwayEntity>();

    add(inMemoryPathwayEntity: InMemoryPathwayEntity) {
        this.#pathways.set(inMemoryPathwayEntity.id, inMemoryPathwayEntity);
    }

    get(id: string) {
        return this.#pathways.get(id);
    }
}
