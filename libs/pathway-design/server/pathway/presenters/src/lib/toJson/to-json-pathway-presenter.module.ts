import { PDSPBP_PATHWAY_PRESENTER_PORT } from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { ToJsonPathwayPresenter } from './to-json-pathway.presenter';

@Module({
    providers: [
        ToJsonPathwayPresenter,
        {
            provide: PDSPBP_PATHWAY_PRESENTER_PORT,
            useExisting: ToJsonPathwayPresenter,
        },
    ],
    exports: [PDSPBP_PATHWAY_PRESENTER_PORT],
})
export class ToJsonPathwayPresenterModule {}
