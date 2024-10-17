import { CCEP_EVENT_TYPE_PATHWAY_INITIALIZED } from './pathway-initialized.constants';

export class CCEPPathwayInitializedEvent {
    public readonly eventType = CCEP_EVENT_TYPE_PATHWAY_INITIALIZED;

    constructor(
        public readonly description: string,
        public readonly pathwayId: string,
        public readonly researchField: string,
        public readonly title: string
    ) {}
}
