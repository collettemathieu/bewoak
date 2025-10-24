import type { Provider } from '@nestjs/common';
import { CHANGE_TITLE_PATHWAY_PERSISTENCE } from '../../business/pathway/ports/persistences/change-title/change-title-pathway-persitence.port';
import { INITIALIZE_PATHWAY_PERSISTENCE } from '../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title/in-memory/change-title-pathway-in-memory.persistence';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize/in-memory/initialize-pathway-in-memory.persistence';
import type { PDSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

export const persistenceProvidersMap: Record<PDSPIPPersistenceDriverAuthorized, Provider[]> = {
    inMemory: [
        InitializePathwayInMemoryPersistence,
        {
            provide: INITIALIZE_PATHWAY_PERSISTENCE,
            useExisting: InitializePathwayInMemoryPersistence,
        },
        ChangeTitlePathwayInMemoryPersistence,
        {
            provide: CHANGE_TITLE_PATHWAY_PERSISTENCE,
            useExisting: ChangeTitlePathwayInMemoryPersistence,
        },
        PathwayInMemoryRepository,
    ],
    orm: [],
};

export const pDSPIPPersistenceKeys = Object.keys(persistenceProvidersMap) as [PDSPIPPersistenceDriverAuthorized];
