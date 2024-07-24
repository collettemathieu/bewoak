import type { Observable } from 'rxjs';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';

export interface PDSPBPInitPathwayMemoryPort {
    save: (
        PDSPBEpathwayEntity: PDSPBEPathwayEntity
    ) => Observable<PDSPBEPathwayEntity>;
}

export const PDSPBP_INIT_PATHWAY_MEMORY_PORT = Symbol(
    'PDSPBPInitPathwayMemoryPort'
);
