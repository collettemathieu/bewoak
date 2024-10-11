import { Module } from '@nestjs/common';
import { presenterModuleMap } from './pathway-presenters.constants';
import type { PDSPPPresenterDriverAuthorized } from './pathway-presenters.types';

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
