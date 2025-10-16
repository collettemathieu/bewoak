import { SSPMP_ADD_PATHWAY_PERSISTENCE_PORT } from '@bewoak/search-server-pathway-models';
import { Module } from '@nestjs/common';
import { persistenceProvidersMap } from './pathway-persistence-infrastructure.constants';
import type { SSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class SSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: SSPIPPersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            module: SSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
            exports: [SSPMP_ADD_PATHWAY_PERSISTENCE_PORT],
        };
    }
}
