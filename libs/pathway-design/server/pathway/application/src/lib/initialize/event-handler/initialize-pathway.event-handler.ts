import { CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import { PDSPBEPathwayInitializedEvent } from '@bewoak/pathway-design-server-pathway-business';
import { EventsHandler, type IEventHandler } from '@nestjs/cqrs';
// biome-ignore lint/style/useImportType: <To be explained>
import { EventEmitter2 } from '@nestjs/event-emitter';

@EventsHandler(PDSPBEPathwayInitializedEvent)
export class PDSPAInitializePathwayEventHandler implements IEventHandler<PDSPBEPathwayInitializedEvent> {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    handle(pDSPBEPathwayInitializedEvent: PDSPBEPathwayInitializedEvent) {
        const event = new CCEPPathwayInitializedEvent(
            pDSPBEPathwayInitializedEvent.payload.description,
            pDSPBEPathwayInitializedEvent.payload.pathwayId,
            pDSPBEPathwayInitializedEvent.payload.researchField,
            pDSPBEPathwayInitializedEvent.payload.title
        );
        this.eventEmitter.emit(event.eventType, event);
    }
}
