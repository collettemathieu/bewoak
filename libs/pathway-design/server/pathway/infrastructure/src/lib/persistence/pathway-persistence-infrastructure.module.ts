import { Module, type Provider } from '@nestjs/common';

import {
    PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
} from '@bewoak/pathway-design-server-pathway-business';
import { ChangeTitlePathwayInMemoryPersistence } from './change-title/in-memory/change-title-pathway-in-memory.persistence';
import { PathwayInMemoryRepository } from './common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize/in-memory/initialize-pathway-in-memory.persistence';

const persistenceProvidersMap: Record<'inMemory', Provider[]> = {
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
};

type PersistenceDriverAuthorized = keyof typeof persistenceProvidersMap;

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: PersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            module: PDSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
            exports: [PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT, PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE_PORT],
        };
    }
}
