import { CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import { EventsHandler, type IEventHandler } from '@nestjs/cqrs';
// biome-ignore lint/style/useImportType: <Not applicable>
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PathwayInitializedEvent } from '../../../business/pathway/events/pathway-initialized.event';

@EventsHandler(PathwayInitializedEvent)
export class InitializePathwayEventHandler implements IEventHandler<PathwayInitializedEvent> {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    handle(pathwayInitializedEvent: PathwayInitializedEvent) {
        const event = new CCEPPathwayInitializedEvent(
            pathwayInitializedEvent.payload.description,
            pathwayInitializedEvent.payload.pathwayId,
            pathwayInitializedEvent.payload.researchField,
            pathwayInitializedEvent.payload.title
        );
        this.eventEmitter.emit(event.eventType, event);
    }
}
