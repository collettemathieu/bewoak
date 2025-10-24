import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import type { ChangeTitlePathwayPersistence } from '../../../business/pathway/ports/persistences/change-title/change-title-pathway-persitence.port';
import type { PathwayPresenter } from '../../../business/pathway/ports/presenters/pathway-presenter.port';

export class ChangeTitlePathwayUseCase {
    execute(
        changeTitlePathwayPersistence: ChangeTitlePathwayPersistence,
        pathwayPresenter: PathwayPresenter,
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
                switchMap(() => changeTitlePathwayPersistence.getPathwayByPathwayId(pathwayId)),
                map((result) => {
                    if (isSuccess(result)) {
                        const pathway = successValue(result);
                        return pathway.changeTitle(title);
                    }
                    return result;
                }),
                switchMap((result) => {
                    if (isSuccess(result)) {
                        return changeTitlePathwayPersistence.changeTitle(successValue(result));
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
                        return pathwayPresenter.present(successValue(result));
                    }
                    return pathwayPresenter.exception(failureValue(result));
                })
            )
        );
    }
}
