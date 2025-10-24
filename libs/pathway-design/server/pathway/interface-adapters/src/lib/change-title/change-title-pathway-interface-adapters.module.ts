import {
    PDSPAChangeTitlePathwayCommandHandler,
    PDSPAChangeTitlePathwayService,
    PDSPACUChangeTitlePathwayUseCase,
} from '@bewoak/pathway-design-server-pathway-application';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ChangeTitlePathwayController } from './controller/change-title-pathway.controller';

@Module({
    controllers: [ChangeTitlePathwayController],
    exports: [PDSPAChangeTitlePathwayService],
    providers: [PDSPAChangeTitlePathwayCommandHandler, PDSPAChangeTitlePathwayService, PDSPACUChangeTitlePathwayUseCase],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPIAChangeTitlePathwayInterfaceAdaptersModule {
    private static imports: Array<Type | DynamicModule> = [];

    static withPresenter(presenterModule: Type | DynamicModule) {
        PDSPIAChangeTitlePathwayInterfaceAdaptersModule.imports.push(presenterModule);
        return PDSPIAChangeTitlePathwayInterfaceAdaptersModule;
    }

    static withPersistence(persistenceModule: Type | DynamicModule) {
        PDSPIAChangeTitlePathwayInterfaceAdaptersModule.imports.push(persistenceModule);
        return PDSPIAChangeTitlePathwayInterfaceAdaptersModule;
    }

    static build() {
        return {
            exports: [PDSPIAChangeTitlePathwayInterfaceAdaptersModule],
            imports: PDSPIAChangeTitlePathwayInterfaceAdaptersModule.imports,
            module: PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
        };
    }
}
