import { TraceSpan } from '@bewoak/common-o11y-server';
import type { PDSPBPPathwayPresenterResult } from '@bewoak/pathway-design-server-pathway-business';
import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <Need for the dependency injection>
import { CommandBus } from '@nestjs/cqrs';
import type { PDSPAInitializePathwayCommand } from '../command/initialize-pathway.command';

@Injectable()
export class PDSPAInitializePathwayService {
    constructor(private readonly commandBus: CommandBus) {}

    @TraceSpan()
    initialize(pDSPAInitializePathwayCommand: PDSPAInitializePathwayCommand) {
        return this.commandBus.execute<PDSPAInitializePathwayCommand, PDSPBPPathwayPresenterResult>(
            pDSPAInitializePathwayCommand
        );
    }
}
