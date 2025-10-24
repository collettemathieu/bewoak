import { CE_EVENT_TYPE_PATHWAY_TITLE_CHANGED, CE_EVENT_VERSION, type CEEvent } from '@bewoak/common-events';

export class PDSPBEPathwayTitleChangedEvent implements CEEvent {
    public readonly eventType = CE_EVENT_TYPE_PATHWAY_TITLE_CHANGED;
    public readonly version = CE_EVENT_VERSION;

    constructor(
        public readonly aggregateId: string,
        public readonly payload: Record<string, unknown>
    ) {}
}
