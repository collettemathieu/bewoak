import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ChangeTitlePathwayCommandHandler } from '../../../application/change-title/command/change-title-pathway.command-handler';
import { ChangeTitlePathwayService } from '../../../application/change-title/service/change-title-pathway.service';
import { ChangeTitlePathwayUseCase } from '../../../application/change-title/usecase/change-title-pathway.usecase';
import { ChangeTitlePathwayController } from './controller/change-title-pathway.controller';

@Module({
    controllers: [ChangeTitlePathwayController],
    exports: [ChangeTitlePathwayService],
    providers: [ChangeTitlePathwayCommandHandler, ChangeTitlePathwayService, ChangeTitlePathwayUseCase],
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
