import { ErrorLog, Log } from '@bewoak/common-log-server';
import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
import {
    type PDSPBPInitializePathwayPersistence,
    type PDSPBPPathwayPresenter,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';

export class PDSPAIUInitializePathwayUsecase {
    @ErrorLog()
    @Log('Initialize pathway')
    execute(
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
        return firstValueFrom(
            of('').pipe(
                map(() => pDSPBFPathwayFactory({ title, description, researchField })),
                switchMap((result) => {
                    if (isSuccess(result)) {
                        return pDSPBPInitializePathwayPersistence.save(successValue(result));
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
