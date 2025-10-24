import { ErrorLog, Log, TraceSpan } from '@bewoak/common-o11y-server';
import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import { pathwayFactory } from '../../../business/pathway/factories/pathway.factory';
import type { InitializePathwayPersistence } from '../../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import type { PathwayPresenter } from '../../../business/pathway/ports/presenters/pathway-presenter.port';

export class InitializePathwayUsecase {
    @ErrorLog()
    @Log('Initialize pathway')
    @TraceSpan()
    execute(
        initializePathwayPersistence: InitializePathwayPersistence,
        pathwayPresenter: PathwayPresenter,
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
        return firstValueFrom(
            of('').pipe(
                map(() => pathwayFactory({ description, researchField, title })),
                switchMap((result) => {
                    if (isSuccess(result)) {
                        return initializePathwayPersistence.save(successValue(result));
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
