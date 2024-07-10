import { Module } from '@nestjs/common';
import { InitializePathwayInMemoryPersistenceModule } from './in-memory/initialize-pathway-in-memory-persistence.module';

const persistenceDriverModuleMap: Record<
    'inMemory',
    typeof InitializePathwayInMemoryPersistenceModule
> = {
    inMemory: InitializePathwayInMemoryPersistenceModule,
};

type PersistenceDriverAuthorized = keyof typeof persistenceDriverModuleMap;

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIInitializePathwayPersistenceInfrastructureModule {
    static use(driver: PersistenceDriverAuthorized) {
        const persistenceModule = persistenceDriverModuleMap[driver];

        return {
            module: PDSPIInitializePathwayPersistenceInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}
