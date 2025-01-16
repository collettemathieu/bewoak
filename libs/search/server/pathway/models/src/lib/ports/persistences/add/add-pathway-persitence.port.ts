import type { SSPMEPathwayEntity } from '../../../entities/pathway';

export interface SSPMPAddPathwayPersistencePort {
    add: (sSPMEPathwayEntity: SSPMEPathwayEntity) => Promise<SSPMEPathwayEntity>;
}

export const SSPMP_ADD_PATHWAY_PERSISTENCE_PORT = Symbol('SSPMPAddPathwayPersistencePort');
