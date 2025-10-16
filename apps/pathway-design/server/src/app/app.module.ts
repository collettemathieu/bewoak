import {
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-infrastructure';
import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
} from '@bewoak/pathway-design-server-pathway-interface-adapters';
import {
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-presenters';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

interface ApplicationBootstrapOptions {
    persistenceDriver: PDSPIPPersistenceDriverAuthorized;
    presenterDriver: PDSPPPresenterDriverAuthorized;
}

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <To be explained>
export class AppModule {
    static register(options: ApplicationBootstrapOptions) {
        const persistenceModule = PDSPIPPathwayPersistenceInfrastructureModule.use(options.persistenceDriver);
        const presenterModule = PDSPPPathwayPresentersModule.use(options.presenterDriver);

        return {
            module: AppModule,
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
                    .build(),
                CqrsModule.forRoot(),
                EventEmitterModule.forRoot({
                    wildcard: false,
                    delimiter: '.',
                    newListener: false,
                    removeListener: false,
                    maxListeners: 10,
                    verboseMemoryLeak: true,
                    ignoreErrors: false,
                }),
            ],
        };
    }
}
