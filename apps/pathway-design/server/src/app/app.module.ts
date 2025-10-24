import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server';
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
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
                    .build(),
                CqrsModule.forRoot(),
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
