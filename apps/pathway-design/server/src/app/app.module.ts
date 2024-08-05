import { Module } from '@nestjs/common';

import { PDSPIInitializePathwayPersistenceInfrastructureModule } from '@bewoak/pathway-design-server-pathway-infrastructure';
import { PDSPIAInitializePathwayInterfaceAdaptersModule } from '@bewoak/pathway-design-server-pathway-interface-adapters';
import { PDSPPPathwayPresentersModule } from '@bewoak/pathway-design-server-pathway-presenters';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        PDSPIAInitializePathwayInterfaceAdaptersModule.withPersistence(
            PDSPIInitializePathwayPersistenceInfrastructureModule.use(
                'inMemory'
            )
        )
            .withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
            .build(),
        CqrsModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
