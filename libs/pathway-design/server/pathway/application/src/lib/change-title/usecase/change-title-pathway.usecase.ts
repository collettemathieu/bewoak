import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
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
        return firstValueFrom(
            of('').pipe(
                switchMap(() => pDSPBPChangeTitlePathwayPersistence.getPathwayByPathwayId(pathwayId)),
                map((result) => {
                    if (isSuccess(result)) {
                        const pathway = successValue(result);
                        return pathway.changeTitle(title);
                    }
                    return result;
                }),
                switchMap((result) => {
                    if (isSuccess(result)) {
                        return pDSPBPChangeTitlePathwayPersistence.changeTitle(successValue(result), title);
                    }

                    return of(result);
                }),
                tap((result) => {
                    // TODO: pattern transactional outbox should be implemented here => https://microservices.io/patterns/data/transactional-outbox.html
                    if (isSuccess(result)) {
                        const pathway = successValue(result);
                        eventPublisher.mergeObjectContext(pathway);
                        pathway.commit();
                    }
                }),
                map((result) => {
                    if (isSuccess(result)) {
                        return pDSPBPPathwayPresenter.present(successValue(result));
                    }
                    return pDSPBPPathwayPresenter.exception(failureValue(result));
                })
            )
        );
    }
}
