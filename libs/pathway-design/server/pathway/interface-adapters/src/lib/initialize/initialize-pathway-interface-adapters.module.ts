import {
    PDSPAInitPathwayCommandHandler,
    PDSPAInitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { PDSPBUInitPathwayUsecase } from '@bewoak/pathway-design-server-pathway-business';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { InitializePathwayController } from './controller/initialize-pathway.controller';

@Module({
    controllers: [InitializePathwayController],
    providers: [
        PDSPAInitPathwayCommandHandler,
        PDSPAInitializePathwayService,
        PDSPBUInitPathwayUsecase,
    ],
    exports: [PDSPAInitializePathwayService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIAInitializePathwayInterfaceAdaptersModule {
    private static imports: Array<Type | DynamicModule> = [];

    static withInfrastructure(infrastructureModule: Type | DynamicModule) {
        PDSPIAInitializePathwayInterfaceAdaptersModule.imports.push(
            infrastructureModule
        );
        return PDSPIAInitializePathwayInterfaceAdaptersModule;
    }

    static withPresenter(presenterModule: Type | DynamicModule) {
        PDSPIAInitializePathwayInterfaceAdaptersModule.imports.push(
            presenterModule
        );
        return PDSPIAInitializePathwayInterfaceAdaptersModule;
    }

    static build() {
        return {
            module: PDSPIAInitializePathwayInterfaceAdaptersModule,
            imports: PDSPIAInitializePathwayInterfaceAdaptersModule.imports,
        };
    }
}
