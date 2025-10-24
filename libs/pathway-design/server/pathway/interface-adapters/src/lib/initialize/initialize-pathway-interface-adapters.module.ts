import {
    PDSPAInitializePathwayCommandHandler,
    PDSPAInitializePathwayEventHandler,
    PDSPAInitializePathwayService,
    PDSPAIUInitializePathwayUsecase,
} from '@bewoak/pathway-design-server-pathway-application';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { InitializePathwayController } from './controller/initialize-pathway.controller';

@Module({
    controllers: [InitializePathwayController],
    exports: [PDSPAInitializePathwayService],
    providers: [
        PDSPAIUInitializePathwayUsecase,
        PDSPAInitializePathwayCommandHandler,
        PDSPAInitializePathwayEventHandler,
        PDSPAInitializePathwayService,
    ],
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
            exports: [PDSPIAInitializePathwayInterfaceAdaptersModule],
            imports: PDSPIAInitializePathwayInterfaceAdaptersModule.imports,
            module: PDSPIAInitializePathwayInterfaceAdaptersModule,
        };
    }
}
