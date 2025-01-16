import { SSPMP_ADD_PATHWAY_PERSISTENCE_PORT } from '@bewoak/search-server-pathway-models';
import type { Provider } from '@nestjs/common';
import { AddPathwayInMemoryPersistence } from './add/in-memory/add-pathway-in-memory.persistence';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import type { SSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

export const persistenceProvidersMap: Record<SSPIPPersistenceDriverAuthorized, Provider[]> = {
    inMemory: [
        AddPathwayInMemoryPersistence,
        {
            provide: SSPMP_ADD_PATHWAY_PERSISTENCE_PORT,
            useExisting: AddPathwayInMemoryPersistence,
        },
        PathwayInMemoryRepository,
    ],
    orm: [],
};

export const pDSPIPPersistenceKeys = Object.keys(persistenceProvidersMap) as [SSPIPPersistenceDriverAuthorized];
