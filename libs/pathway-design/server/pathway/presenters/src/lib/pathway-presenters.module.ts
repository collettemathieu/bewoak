import { Module } from '@nestjs/common';
import { ToJsonPathwayPresenterModule } from './toJson/to-json-pathway-presenter.module';

const presenterModuleMap: Record<'toJson', typeof ToJsonPathwayPresenterModule> = {
    toJson: ToJsonPathwayPresenterModule,
};

export const pDSPPPresenterKeys = Object.keys(presenterModuleMap) as [PDSPPPresenterDriverAuthorized];

export type PDSPPPresenterDriverAuthorized = keyof typeof presenterModuleMap;

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: not pertinent here because this is a module
export class PDSPPPathwayPresentersModule {
    static use(driver: PDSPPPresenterDriverAuthorized) {
        const presenterModule = presenterModuleMap[driver];

        return {
            module: PDSPPPathwayPresentersModule,
            imports: [presenterModule],
            exports: [presenterModule],
        };
    }
}
