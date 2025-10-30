import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { InitializePathwayCommandHandler } from '../../../application/initialize/command/initialize-pathway.command-handler';
import { InitializePathwayEventHandler } from '../../../application/initialize/event-handler/initialize-pathway.event-handler';
import { InitializePathwayService } from '../../../application/initialize/service/initialize-pathway.service';
import { InitializePathwayUsecase } from '../../../application/initialize/usecase/initialize-pathway.usecase';
import { InitializePathwayController } from './controller/initialize-pathway.controller';

@Module({
    controllers: [InitializePathwayController],
    exports: [],
    providers: [
        InitializePathwayUsecase,
        InitializePathwayCommandHandler,
        InitializePathwayEventHandler,
        InitializePathwayService,
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
