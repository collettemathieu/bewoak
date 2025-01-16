import { type CEEvent, CE_EVENT_TYPE_PATHWAY_INITIALIZED, CE_EVENT_VERSION } from '@bewoak/common-events';

export class PDSPBEPathwayInitializedEvent implements CEEvent {
    public readonly eventType = CE_EVENT_TYPE_PATHWAY_INITIALIZED;
    public readonly version = CE_EVENT_VERSION;

    constructor(
        public readonly aggregateId: string,
        public readonly payload: {
            description: string;
            pathwayId: string;
            researchField: string;
            title: string;
        }
    ) {}
}
