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
        const pathwayFromPersistence = await pDSPBPChangeTitlePathwayPersistencePort.changeTitle(pathwayId, title);

        eventPublisher.mergeObjectContext(pathwayFromPersistence);
        pathwayFromPersistence.commit();

        return pDSPBPPathwayPresenterPort.present(pathwayFromPersistence);
    }
}
