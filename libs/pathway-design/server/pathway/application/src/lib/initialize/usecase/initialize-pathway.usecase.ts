import {
    type PDSPBPInitializePathwayPersistencePort,
    type PDSPBPPathwayPresenterPort,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';

export class PDSPAIUInitializePathwayUsecase {
    async execute(
        pDSPBPInitializePathwayPersistencePort: PDSPBPInitializePathwayPersistencePort,
        pDSPBPPathwayPresenterPort: PDSPBPPathwayPresenterPort,
        eventPublisher: EventPublisher,
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

        // TODO: pattern transactional outbox should be implemented here => https://microservices.io/patterns/data/transactional-outbox.html
        const pathwayFromPersistence = await pDSPBPInitializePathwayPersistencePort.save(pathway);

        eventPublisher.mergeObjectContext(pathway);
        pathway.commit();

        return pDSPBPPathwayPresenterPort.present(pathwayFromPersistence);
    }
}
