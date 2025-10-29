import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { IndexPathwayListener } from './listener/index-pathway.listener';

@Module({
    controllers: [],
    exports: [],
    providers: [IndexPathwayListener],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class SSPAAddPathwayApplicationModule {
    private static imports: Array<Type | DynamicModule> = [];

    static withPresenter(presenterModule: Type | DynamicModule) {
        SSPAAddPathwayApplicationModule.imports.push(presenterModule);
        return SSPAAddPathwayApplicationModule;
    }

    static withPersistence(persistenceModule: Type | DynamicModule) {
        SSPAAddPathwayApplicationModule.imports.push(persistenceModule);
        return SSPAAddPathwayApplicationModule;
    }

    static build() {
        return {
            exports: [SSPAAddPathwayApplicationModule],
            imports: SSPAAddPathwayApplicationModule.imports,
            module: SSPAAddPathwayApplicationModule,
        };
    }
}
