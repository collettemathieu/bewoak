import {
    SSPAAddPathwayApplicationModule,
    SSPIPPathwayPersistenceInfrastructureModule,
    type SSPIPPersistenceDriverAuthorized,
} from '@bewoak/search-server';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

interface ApplicationBootstrapOptions {
    persistenceDriver: SSPIPPersistenceDriverAuthorized;
}

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <To be explained>
export class AppModule {
    static register(options: ApplicationBootstrapOptions) {
        const persistenceModule = SSPIPPathwayPersistenceInfrastructureModule.use(options.persistenceDriver);

        return {
            imports: [
                SSPAAddPathwayApplicationModule.withPersistence(persistenceModule).build(),
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
