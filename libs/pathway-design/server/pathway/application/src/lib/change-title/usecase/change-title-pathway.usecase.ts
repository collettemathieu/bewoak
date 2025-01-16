import type {
    PDSPBPChangeTitlePathwayPersistencePort,
    PDSPBPPathwayPresenterPort,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';

export class PDSPACUChangeTitlePathwayUseCase {
    async execute(
        pDSPBPChangeTitlePathwayPersistencePort: PDSPBPChangeTitlePathwayPersistencePort,
        pDSPBPPathwayPresenterPort: PDSPBPPathwayPresenterPort,
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
        const pathwayFromPersistence = await pDSPBPChangeTitlePathwayPersistencePort.changeTitle(pathwayId, title);

        eventPublisher.mergeObjectContext(pathwayFromPersistence);
        pathwayFromPersistence.commit();

        return pDSPBPPathwayPresenterPort.present(pathwayFromPersistence);
    }
}
