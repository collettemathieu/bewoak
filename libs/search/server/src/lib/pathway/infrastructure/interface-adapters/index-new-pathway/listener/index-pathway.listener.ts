import { CCEP_EVENT_TYPE_PATHWAY_INITIALIZED, type CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// biome-ignore lint/style/useImportType: <Not pertinent>
import { IndexPathwayService } from '../../../../application/index-pathway/Service/index-pathway.service';
@Injectable()
export class PathwayInitializedListener {
    constructor(private readonly indexPathwayService: IndexPathwayService) {}

    @OnEvent(CCEP_EVENT_TYPE_PATHWAY_INITIALIZED, { async: true })
    handlePathwayInitializedEvent(event: CCEPPathwayInitializedEvent) {
        this.indexPathwayService.indexPathway({
            createdAt: Date.now(),
            description: event.description,
            pathwayId: event.pathwayId,
            researchField: event.researchField,
            title: event.title,
            updatedAt: Date.now(),
        });
    }
}
