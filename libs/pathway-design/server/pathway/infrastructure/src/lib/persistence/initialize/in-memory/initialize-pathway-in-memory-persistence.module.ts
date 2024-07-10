import { PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT } from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { PathwayInMemoryRepository } from '../../common/in-memory/repositories/in-memory-pathway.repository';
import { InitializePathwayInMemoryPersistence } from './initialize-pathway-in-memory.persistence';

@Module({
    imports: [],
    providers: [
        PathwayInMemoryRepository,
        InitializePathwayInMemoryPersistence,
        {
            provide: PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT,
            useExisting: InitializePathwayInMemoryPersistence,
        },
    ],
    exports: [PDSPBP_INITIALIZE_PATHWAY_PERSISTENCE_PORT],
})
export class InitializePathwayInMemoryPersistenceModule {}
