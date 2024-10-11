import {
    PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
} from '@bewoak/pathway-design-server-pathway-business';
import type { Provider } from '@nestjs/common';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title/in-memory/change-title-pathway-in-memory.persistence';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize/in-memory/initialize-pathway-in-memory.persistence';
import type { PDSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

export const persistenceProvidersMap: Record<PDSPIPPersistenceDriverAuthorized, Provider[]> = {
    inMemory: [
        InitializePathwayInMemoryPersistence,
        {
            provide: PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
            useExisting: InitializePathwayInMemoryPersistence,
        },
        ChangeTitlePathwayInMemoryPersistence,
        {
            provide: PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT,
            useExisting: ChangeTitlePathwayInMemoryPersistence,
        },
        PathwayInMemoryRepository,
    ],
    orm: [],
};

export const pDSPIPPersistenceKeys = Object.keys(persistenceProvidersMap) as [PDSPIPPersistenceDriverAuthorized];
