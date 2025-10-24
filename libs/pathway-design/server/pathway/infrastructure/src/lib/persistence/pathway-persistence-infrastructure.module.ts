import {
    PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE,
    PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE,
} from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { persistenceProvidersMap } from './pathway-persistence-infrastructure.constants';
import type { PDSPIPPersistenceDriverAuthorized } from './pathway-persistence-infrastructure.types';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIPPathwayPersistenceInfrastructureModule {
    static use(driver: PDSPIPPersistenceDriverAuthorized) {
        const persistenceProviders = persistenceProvidersMap[driver];

        return {
            exports: [PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE, PDSPBP_CHANGE_TITLE_PATHWAY_PERSISTENCE],
            module: PDSPIPPathwayPersistenceInfrastructureModule,
            providers: [...persistenceProviders],
        };
    }
}
