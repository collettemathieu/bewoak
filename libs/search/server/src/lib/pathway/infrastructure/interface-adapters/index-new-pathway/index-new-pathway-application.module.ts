import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { IndexPathwayService } from '../../../application/index-pathway/Service/index-pathway.service';
import { PathwayInitializedListener } from './listener/index-pathway.listener';

@Module({
    controllers: [],
    exports: [],
    providers: [PathwayInitializedListener, IndexPathwayService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class SSPAAddPathwayApplicationModule {
    private static imports: Array<Type | DynamicModule> = [];

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
