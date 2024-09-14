import { Module } from '@nestjs/common';

import { PDSPIPPathwayPersistenceInfrastructureModule } from '@bewoak/pathway-design-server-pathway-infrastructure';
import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
} from '@bewoak/pathway-design-server-pathway-interface-adapters';
import { PDSPPPathwayPresentersModule } from '@bewoak/pathway-design-server-pathway-presenters';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
            .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use('inMemory'))
            .build(),
        PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
            .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use('inMemory'))
            .build(),
        CqrsModule.forRoot(),
        CqrsModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
