import { PDSPBP_INIT_PATHWAY_MEMORY_PORT } from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { InMemoryPathwayRepository } from '../../../common/persistence/in-memory/repositories/in-memory-pathway.repository';
import { PDIIPPInitPathwayInMemory } from './init-pathway-in-memory.persistence';

@Module({
    imports: [],
    providers: [
        InMemoryPathwayRepository,
        PDIIPPInitPathwayInMemory,
        {
            provide: PDSPBP_INIT_PATHWAY_MEMORY_PORT,
            useExisting: PDIIPPInitPathwayInMemory,
        },
    ],
    exports: [PDSPBP_INIT_PATHWAY_MEMORY_PORT],
})
export class PDSPIIPPInitPathwayInMemoryPersistenceModule {}
