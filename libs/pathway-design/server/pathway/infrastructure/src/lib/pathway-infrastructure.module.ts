import { Module } from '@nestjs/common';
import { PDSPIIPPInitPathwayInMemoryPersistenceModule } from './initialize/persistence/in-memory/init-pathway-in-memory-persistence.module';

const persistenceDriverModuleMap: Record<
    'inMemory',
    typeof PDSPIIPPInitPathwayInMemoryPersistenceModule
> = {
    inMemory: PDSPIIPPInitPathwayInMemoryPersistenceModule,
};

type PersistenceDriverAuthorized = keyof typeof persistenceDriverModuleMap;

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIPathwayInfrastructureModule {
    static use(driver: PersistenceDriverAuthorized) {
        const persistenceModule = persistenceDriverModuleMap[driver];

        return {
            module: PDSPIPathwayInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}
