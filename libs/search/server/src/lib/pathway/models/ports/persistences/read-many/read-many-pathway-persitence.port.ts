import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import type { AsyncResult } from '@bewoak/common-types-result';
import type { PathwayEntity } from '../../../entities/pathway';

export interface ReadManyPathwayPersistence {
    readMany: () => AsyncResult<PathwayEntity[], CTSEException>;
}

export const READ_MANY_PATHWAY_PERSISTENCE = Symbol('ReadManyPathwayPersistence');
