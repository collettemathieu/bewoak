import type { Provider } from '@nestjs/common';
import { INDEX_PATHWAY_PERSISTENCE } from '../../models/ports/persistences/index/index-pathway-persitence.port';
import { READ_MANY_PATHWAY_PERSISTENCE } from '../../models/ports/persistences/read-many/read-many-pathway-persitence.port';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import { IndexPathwayInMemoryPersistence } from './index/in-memory/index-pathway-in-memory.persistence';
import type { SSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';
import { ReadManyPathwayInMemoryPersistence } from './read-many/in-memory/read-many-pathway-in-memory.persistence';

export const persistenceProvidersMap: Record<SSPIPPersistenceDriverAuthorized, Provider[]> = {
    inMemory: [
        IndexPathwayInMemoryPersistence,
        {
            provide: INDEX_PATHWAY_PERSISTENCE,
            useExisting: IndexPathwayInMemoryPersistence,
        },
        ReadManyPathwayInMemoryPersistence,
        {
            provide: READ_MANY_PATHWAY_PERSISTENCE,
            useExisting: ReadManyPathwayInMemoryPersistence,
        },
        PathwayInMemoryRepository,
    ],
    orm: [],
};

export const sSPIPPersistenceKeys = Object.keys(persistenceProvidersMap) as [SSPIPPersistenceDriverAuthorized];
