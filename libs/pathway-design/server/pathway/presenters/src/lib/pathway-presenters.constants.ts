import type { PDSPPPresenterDriverAuthorized } from './pathway-presenters.types';
import { ToJsonPathwayPresenterModule } from './toJson/to-json-pathway-presenter.module';

export const presenterModuleMap: Record<PDSPPPresenterDriverAuthorized, typeof ToJsonPathwayPresenterModule> = {
    toJson: ToJsonPathwayPresenterModule,
};

export const pDSPPPresenterKeys = Object.keys(presenterModuleMap) as [PDSPPPresenterDriverAuthorized];
