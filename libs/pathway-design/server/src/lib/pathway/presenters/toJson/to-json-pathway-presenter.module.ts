import { Module } from '@nestjs/common';
import { PATHWAY_PRESENTER } from '../../business/pathway/ports/presenters/pathway-presenter.port';
import { ToJsonPathwayPresenter } from './to-json-pathway.presenter';

@Module({
    exports: [PATHWAY_PRESENTER],
    providers: [
        ToJsonPathwayPresenter,
        {
            provide: PATHWAY_PRESENTER,
            useExisting: ToJsonPathwayPresenter,
        },
    ],
})
export class ToJsonPathwayPresenterModule {}
