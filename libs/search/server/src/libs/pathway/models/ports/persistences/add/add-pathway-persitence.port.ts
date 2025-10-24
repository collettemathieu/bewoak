import type { PathwayEntity } from '../../../entities/pathway';

export interface AddPathwayPersistencePort {
    add: (sSPMEPathwayEntity: PathwayEntity) => Promise<PathwayEntity>;
}

export const ADD_PATHWAY_PERSISTENCE_PORT = Symbol('AddPathwayPersistencePort');
