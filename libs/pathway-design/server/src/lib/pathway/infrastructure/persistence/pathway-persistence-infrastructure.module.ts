import { Module } from '@nestjs/common';
import { CHANGE_TITLE_PATHWAY_PERSISTENCE } from '../../business/pathway/ports/persistences/change-title/change-title-pathway-persitence.port';
import { INITIALIZE_PATHWAY_PERSISTENCE } from '../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import { persistenceProvidersMap } from './pathway-persistence-infrastructure.constants';
import type { PDSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: PDSPIPPersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            exports: [INITIALIZE_PATHWAY_PERSISTENCE, CHANGE_TITLE_PATHWAY_PERSISTENCE],
            module: PDSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
        };
    }
}
