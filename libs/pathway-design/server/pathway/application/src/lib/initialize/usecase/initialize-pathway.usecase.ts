import { ErrorLog, Log } from '@bewoak/common-log-server';
import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
import {
    type PDSPBPInitializePathwayPersistence,
    type PDSPBPPathwayPresenter,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, from, of, switchMap } from 'rxjs';

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
            of(
                pDSPBFPathwayFactory({
                    title,
                    description,
                    researchField,
                })
            ).pipe(
                switchMap((result) => {
                    if (isSuccess(result)) {
                        const pathway = successValue(result);
                        // TODO: pattern transactional outbox should be implemented here => https://microservices.io/patterns/data/transactional-outbox.html

                        eventPublisher.mergeObjectContext(pathway);
                        pathway.commit();

                        return from(pDSPBPInitializePathwayPersistence.save(pathway)).pipe(
                            switchMap((result) =>
                                isSuccess(result)
                                    ? of(pDSPBPPathwayPresenter.present(successValue(result)))
                                    : of(pDSPBPPathwayPresenter.exception(failureValue(result)))
                            )
                        );
                    }

                    return of(pDSPBPPathwayPresenter.exception(failureValue(result)));
                })
            )
        );
    }
}
