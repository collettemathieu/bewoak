import type { PDSPBPChangeTitlePathwayPersistence, PDSPBPPathwayPresenter } from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';

export class PDSPACUChangeTitlePathwayUseCase {
    async execute(
        pDSPBPChangeTitlePathwayPersistence: PDSPBPChangeTitlePathwayPersistence,
        pDSPBPPathwayPresenter: PDSPBPPathwayPresenter,
        eventPublisher: EventPublisher,
        {
            pathwayId,
            title,
        }: {
            pathwayId: string;
            title: string;
        }
    ) {
        // TODO: pattern transactional outbox should be implemented here => https://microservices.io/patterns/data/transactional-outbox.html
        const pathwayFromPersistence = await pDSPBPChangeTitlePathwayPersistence.changeTitle(pathwayId, title);

        eventPublisher.mergeObjectContext(pathwayFromPersistence);
        pathwayFromPersistence.commit();

        return pDSPBPPathwayPresenter.present(pathwayFromPersistence);
    }
}
