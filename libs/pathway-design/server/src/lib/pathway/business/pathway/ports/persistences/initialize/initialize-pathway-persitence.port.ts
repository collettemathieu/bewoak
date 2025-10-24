import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PathwayEntity } from '../../../entities/pathway';

export interface InitializePathwayPersistence {
    save: (pDSPBEPathwayEntity: PathwayEntity) => AsyncResult<PathwayEntity, CTSEException>;
}

export const INITIALIZE_PATHWAY_PERSISTENCE = Symbol('InitializePathwayPersistence');
