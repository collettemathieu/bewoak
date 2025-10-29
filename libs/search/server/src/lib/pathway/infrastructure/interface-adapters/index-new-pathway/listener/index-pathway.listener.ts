import { CCEP_EVENT_TYPE_PATHWAY_INITIALIZED, type CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
@Injectable()
export class IndexPathwayListener {
    @OnEvent(CCEP_EVENT_TYPE_PATHWAY_INITIALIZED, { async: true })
    handleNewPathwayEvent(event: CCEPPathwayInitializedEvent) {
        // biome-ignore lint/suspicious/noConsole: <for testing>
        console.log(event);
    }
}
