import type {
    CCEPPathwayInitializedEventPayload,
    CCEPPathwayInitializedEventType,
} from '@bewoak/common-contracts-events-pathway';
import { PDSPBEPathwayInitializedEvent } from '@bewoak/pathway-design-server-pathway-business';
import { EventsHandler, type IEventHandler } from '@nestjs/cqrs';
// biome-ignore lint/style/useImportType: <explanation>
import { EventEmitter2 } from '@nestjs/event-emitter';

@EventsHandler(PDSPBEPathwayInitializedEvent)
export class PDSPAInitializePathwayEventHandler implements IEventHandler<PDSPBEPathwayInitializedEvent> {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    handle(event: PDSPBEPathwayInitializedEvent) {
        const payload: CCEPPathwayInitializedEventPayload = {
            description: event.payload['description'] as string,
            title: event.payload['title'] as string,
            researchField: event.payload['researchField'] as string,
        };
        const type: CCEPPathwayInitializedEventType = 'pathway-initialized';
        this.eventEmitter.emit(type, payload);
    }
}
