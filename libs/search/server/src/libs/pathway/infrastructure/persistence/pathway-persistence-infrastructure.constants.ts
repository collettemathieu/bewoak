import type { Provider } from '@nestjs/common';
import { ADD_PATHWAY_PERSISTENCE_PORT } from '../../models/ports/persistences/add/add-pathway-persitence.port';
import { AddPathwayInMemoryPersistence } from './add/in-memory/add-pathway-in-memory.persistence';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import type { PersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

export const persistenceProvidersMap: Record<PersistenceDriverAuthorized, Provider[]> = {
    inMemory: [
        AddPathwayInMemoryPersistence,
        {
            provide: ADD_PATHWAY_PERSISTENCE_PORT,
            useExisting: AddPathwayInMemoryPersistence,
        },
        PathwayInMemoryRepository,
    ],
    orm: [],
};

export const pDSPIPPersistenceKeys = Object.keys(persistenceProvidersMap) as [PersistenceDriverAuthorized];
