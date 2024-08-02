import { PDSPBFpathwayFactory } from '../../factories/pathway';

import type { PDSPBPInitializePathwayPersistencePort } from '@bewoak/pathway-design-server-pathway-business';
import type { PDSPBPToJsonPathwayPresenterPort } from '../../ports/presenters/to-json-pathway.port';

export class PDSPBUInitializePathwayUsecase {
    async execute(
        pDSPBPInitializePathwayPersistencePort: PDSPBPInitializePathwayPersistencePort,
        pDSPBPToJsonPathwayPresenterPort: PDSPBPToJsonPathwayPresenterPort,
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

        const pathwayFromPersistence =
            await pDSPBPInitializePathwayPersistencePort.save(pathway);

        return pDSPBPToJsonPathwayPresenterPort.present(pathwayFromPersistence);
    }
}
