import { Module } from '@nestjs/common';
import { PDSPPHttpPathwayPresentersModule } from './http/http-pathway-presenters.module';

const presenterModuleMap: Record<
    'http',
    typeof PDSPPHttpPathwayPresentersModule
> = {
    http: PDSPPHttpPathwayPresentersModule,
};

type PresenterDriverAuthorized = keyof typeof presenterModuleMap;

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPPPathwayPresentersModule {
    static use(driver: PresenterDriverAuthorized) {
        const persistenceModule = presenterModuleMap[driver];

        return {
            module: PDSPPPathwayPresentersModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        };
    }
}
