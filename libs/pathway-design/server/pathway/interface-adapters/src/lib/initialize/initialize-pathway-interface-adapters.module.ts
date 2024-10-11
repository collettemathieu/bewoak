import {
    PDSPAIUInitializePathwayUsecase,
    PDSPAInitializePathwayCommandHandler,
    PDSPA_InitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { InitializePathwayController } from './controller/initialize-pathway.controller';

@Module({
    controllers: [InitializePathwayController],
    providers: [PDSPAInitializePathwayCommandHandler, PDSPA_InitializePathwayService, PDSPAIUInitializePathwayUsecase],
    exports: [PDSPA_InitializePathwayService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIAInitializePathwayInterfaceAdaptersModule {
    private static imports: Array<Type | DynamicModule> = [];

    static withPresenter(presenterModule: Type | DynamicModule) {
        PDSPIAInitializePathwayInterfaceAdaptersModule.imports.push(presenterModule);
        return PDSPIAInitializePathwayInterfaceAdaptersModule;
    }

    static withPersistence(persistenceModule: Type | DynamicModule) {
        PDSPIAInitializePathwayInterfaceAdaptersModule.imports.push(persistenceModule);
        return PDSPIAInitializePathwayInterfaceAdaptersModule;
    }

    static build() {
        return {
            module: PDSPIAInitializePathwayInterfaceAdaptersModule,
            imports: PDSPIAInitializePathwayInterfaceAdaptersModule.imports,
            exports: [PDSPIAInitializePathwayInterfaceAdaptersModule],
        };
    }
}
