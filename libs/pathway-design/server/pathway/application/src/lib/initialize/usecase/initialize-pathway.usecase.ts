import { failureValue, isSuccess, successValue } from '@bewoak/common-types-result';
import {
    type PDSPBPInitializePathwayPersistence,
    type PDSPBPPathwayPresenter,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { EventPublisher } from '@nestjs/cqrs';
import { firstValueFrom, of, switchMap } from 'rxjs';

export class PDSPAIUInitializePathwayUsecase {
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
                switchMap((pathway) => {
                    // TODO: pattern transactional outbox should be implemented here => https://microservices.io/patterns/data/transactional-outbox.html

                    eventPublisher.mergeObjectContext(pathway);
                    pathway.commit();
                    return pDSPBPInitializePathwayPersistence.save(pathway);
                }),
                switchMap((result) =>
                    isSuccess(result)
                        ? of(pDSPBPPathwayPresenter.present(successValue(result)))
                        : of(pDSPBPPathwayPresenter.exception(failureValue(result)))
                )
            )
        );
    }
}
