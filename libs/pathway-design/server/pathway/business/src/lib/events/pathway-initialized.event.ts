import type { PDSPBEPathwayEntity } from '../entities/pathway';

export class PDSPBEPathwayInitializedEvent {
    constructor(public readonly pathway: PDSPBEPathwayEntity) {}
}
