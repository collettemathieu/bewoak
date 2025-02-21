import type { PDSPBPChangeTitlePathwayPersistence, PDSPBPPathwayPresenter } from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';

export class PDSPACUChangeTitlePathwayUseCase {
    execute(
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
        return firstValueFrom(
            of('').pipe(
                switchMap(() => pDSPBPChangeTitlePathwayPersistence.changeTitle(pathwayId, title)),
                tap((pathway) => {
                    eventPublisher.mergeObjectContext(pathway);
                    pathway.commit();
                }),
                map((pathway) => pDSPBPPathwayPresenter.present(pathway))
            )
        );
    }
}
