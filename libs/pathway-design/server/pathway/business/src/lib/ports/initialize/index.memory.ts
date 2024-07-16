import type { Observable } from 'rxjs';
import type { PathwayDesignServerPathwayBusinessEntitiesPathway } from '../../entities/pathway';

export interface PathwayDesignServerPathwayBusinessPortsInitPathwayMemory {
    save: (
        pathwayDesignServerPathwayBusinessEntitiesPathway: PathwayDesignServerPathwayBusinessEntitiesPathway
    ) => Observable<PathwayDesignServerPathwayBusinessEntitiesPathway>;
}

export const PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY =
    Symbol('PathwayDesignServerPathwayBusinessPortsInitPathwayMemory');
