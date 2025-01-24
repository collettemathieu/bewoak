import {
    type PDSPBPInitializePathwayPersistence,
    type PDSPBPPathwayPresenter,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';

export class PDSPAIUInitializePathwayUsecase {
    async execute(
        pDSPBPInitializePathwayPersistence: PDSPBPInitializePathwayPersistence,
        pDSPBPPathwayPresenter: PDSPBPPathwayPresenter,
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
        const pathwayFromPersistence = await pDSPBPInitializePathwayPersistence.save(pathway);

        eventPublisher.mergeObjectContext(pathway);
        pathway.commit();

        return pDSPBPPathwayPresenter.present(pathwayFromPersistence);
    }
}
