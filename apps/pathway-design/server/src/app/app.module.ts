import { Module } from '@nestjs/common';

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
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

interface ApplicationBootstrapOptions {
    persistenceDriver: PDSPIPPersistenceDriverAuthorized;
    presenterDriver: PDSPPPresenterDriverAuthorized;
}

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AppModule {
    static register(options: ApplicationBootstrapOptions) {
        return {
            module: AppModule,
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(
                    PDSPPPathwayPresentersModule.use(options.presenterDriver)
                )
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use(options.persistenceDriver))
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(
                    PDSPPPathwayPresentersModule.use(options.presenterDriver)
                )
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use(options.persistenceDriver))
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
