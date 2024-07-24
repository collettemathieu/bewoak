import { PDSPBP_HTTP_PATHWAY_PORT } from '@bewoak/pathway-design-server-pathway-business';
import { Module } from '@nestjs/common';
import { PDSPPHttpPathwayPresenter } from './http-pathway.presenter';

@Module({
    providers: [
        PDSPPHttpPathwayPresenter,
        {
            provide: PDSPBP_HTTP_PATHWAY_PORT,
            useExisting: PDSPPHttpPathwayPresenter,
        },
    ],
    exports: [PDSPBP_HTTP_PATHWAY_PORT],
})
export class PDSPPHttpPathwayPresentersModule {}
