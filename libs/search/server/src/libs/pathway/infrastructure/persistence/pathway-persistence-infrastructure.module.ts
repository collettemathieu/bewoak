import { Module } from '@nestjs/common';
import { ADD_PATHWAY_PERSISTENCE_PORT } from '../../models/ports/persistences/add/add-pathway-persitence.port';
import { persistenceProvidersMap } from './pathway-persistence-infrastructure.constants';
import type { PersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class SSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: PersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            exports: [ADD_PATHWAY_PERSISTENCE_PORT],
            module: SSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
        };
    }
}
