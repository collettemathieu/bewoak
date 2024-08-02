import {
    type PDSPBPInitializePathwayPersistencePort,
    type PDSPBPToJsonPathwayPresenterPort,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';

export class PDSPAIUInitializePathwayUsecase {
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
        const pathway = pDSPBFPathwayFactory({
            title,
            description,
            researchField,
        });

        const pathwayFromPersistence =
            await pDSPBPInitializePathwayPersistencePort.save(pathway);

        return pDSPBPToJsonPathwayPresenterPort.present(pathwayFromPersistence);
    }
}
