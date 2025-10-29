import { Module } from '@nestjs/common';
import { INDEX_PATHWAY_PERSISTENCE } from '../../models/ports/persistences/index/index-pathway-persitence.port';
import { READ_MANY_PATHWAY_PERSISTENCE } from '../../models/ports/persistences/read-many/read-many-pathway-persitence.port';
import { persistenceProvidersMap } from './pathway-persistence-infrastructure.constants';
import type { SSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class SSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: SSPIPPersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            exports: [INDEX_PATHWAY_PERSISTENCE, READ_MANY_PATHWAY_PERSISTENCE],
            module: SSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
        };
    }
}
