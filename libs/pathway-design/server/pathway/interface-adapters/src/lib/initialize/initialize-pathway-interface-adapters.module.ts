import {
    PDSPAIUInitializePathwayUsecase,
    PDSPAInitializePathwayCommandHandler,
    PDSPAInitializePathwayService,
} from '@bewoak/pathway-design-server-pathway-application';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { InitializePathwayController } from './controller/initialize-pathway.controller';

@Module({
    controllers: [InitializePathwayController],
    providers: [
        PDSPAInitializePathwayCommandHandler,
        PDSPAInitializePathwayService,
        PDSPAIUInitializePathwayUsecase,
    ],
    exports: [PDSPAInitializePathwayService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIAInitializePathwayInterfaceAdaptersModule {
    private static imports: Array<Type | DynamicModule> = [];

    static withPersistence(persistenceModule: Type | DynamicModule) {
        PDSPIAInitializePathwayInterfaceAdaptersModule.imports.push(
            persistenceModule
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