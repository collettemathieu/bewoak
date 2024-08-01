import { map } from 'rxjs';
import { PDSPBFpathwayFactory } from '../../factories/pathway';
import type { PDSPBPHttpPathwayPort } from '../../ports/http/http-pathway.port';
import type { PDSPBPInitPathwayMemoryPort } from '../../ports/initialize/init-port-memory.port';

export class PDSPBUInitPathwayUsecase {
    execute(
        pDSPBPInitPathwayMemoryPort: PDSPBPInitPathwayMemoryPort,
        pDSPBPHttpPathwayPort: PDSPBPHttpPathwayPort,
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

        return pDSPBPInitPathwayMemoryPort
            .save(pathway)
            .pipe(map((pathway) => pDSPBPHttpPathwayPort.present(pathway)));
    }
}
