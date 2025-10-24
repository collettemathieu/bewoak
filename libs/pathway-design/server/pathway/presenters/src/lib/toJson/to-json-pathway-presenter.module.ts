import { PDSPBP_PATHWAY_PRESENTER } from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { ToJsonPathwayPresenter } from './to-json-pathway.presenter';

@Module({
    exports: [PDSPBP_PATHWAY_PRESENTER],
    providers: [
        ToJsonPathwayPresenter,
        {
            provide: PDSPBP_PATHWAY_PRESENTER,
            useExisting: ToJsonPathwayPresenter,
        },
    ],
})
export class ToJsonPathwayPresenterModule {}
