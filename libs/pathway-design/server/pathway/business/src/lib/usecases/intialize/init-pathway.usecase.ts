import { PDSPBFpathwayFactory } from '../../factories/pathway';
import type { PDSPBPInitPathwayMemoryPort } from '../../ports/initialize/init-port-memory.port';

export class PDSPBUInitPathwayUsecase {
    execute(
        pDSPBPInitPathwayMemoryPort: PDSPBPInitPathwayMemoryPort,
        {
            title,
            description,
            researchField,
        }: {
            title: string;
            description: string;
            researchField: string;
        }
    ) {
        const pathway = PDSPBFpathwayFactory({
            title,
            description,
            researchField,
        });

        return pDSPBPInitPathwayMemoryPort.save(pathway);
    }
}
