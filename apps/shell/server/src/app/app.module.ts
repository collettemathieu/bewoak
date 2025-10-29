import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server';
import {
    SSPAAddPathwayApplicationModule,
    SSPIPPathwayPersistenceInfrastructureModule,
    type SSPIPPersistenceDriverAuthorized,
} from '@bewoak/search-server';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

interface ApplicationBootstrapOptions {
    persistenceDriverSearchServer: SSPIPPersistenceDriverAuthorized;
    persistenceDriverPathwayDesignServer: PDSPIPPersistenceDriverAuthorized;
    presenterDriverPathwayDesignServer: PDSPPPresenterDriverAuthorized;
}

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <To be explained>
export class AppModule {
    static register(options: ApplicationBootstrapOptions) {
        const persistenceModuleSearchServer = SSPIPPathwayPersistenceInfrastructureModule.use(
            options.persistenceDriverSearchServer
        );
        const persistenceModulePathwayDesignServer = PDSPIPPathwayPersistenceInfrastructureModule.use(
            options.persistenceDriverPathwayDesignServer
        );
        const presenterModulePathwayDesignServer = PDSPPPathwayPresentersModule.use(options.presenterDriverPathwayDesignServer);

        return {
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(presenterModulePathwayDesignServer)
                    .withPersistence(persistenceModulePathwayDesignServer)
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(presenterModulePathwayDesignServer)
                    .withPersistence(persistenceModulePathwayDesignServer)
                    .build(),
                CqrsModule.forRoot(),
                SSPAAddPathwayApplicationModule.withPersistence(persistenceModuleSearchServer).build(),
                EventEmitterModule.forRoot({
                    delimiter: '.',
                    ignoreErrors: false,
                    maxListeners: 10,
                    newListener: false,
                    removeListener: false,
                    verboseMemoryLeak: true,
                    wildcard: false,
                }),
            ],
            module: AppModule,
        };
    }
}
