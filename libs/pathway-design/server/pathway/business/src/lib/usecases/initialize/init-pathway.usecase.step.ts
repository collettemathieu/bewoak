import { strict as assert } from 'node:assert';

import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import { firstValueFrom, of } from 'rxjs';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import type { PathwayInitDto } from '../../factories/pathway.dto';
import type {
    PDSPBPHttpPathwayPort,
    PDSPBPHttpPathwayPortOutput,
} from '../../ports/http/http-pathway.port';
import type { PDSPBPInitPathwayMemoryPort } from '../../ports/initialize/init-port-memory.port';
import { PDSPBUInitPathwayUsecase } from './init-pathway.usecase';

class InitPathwayMemory implements PDSPBPInitPathwayMemoryPort {
    save(PDSPBEpathwayEntity: PDSPBEPathwayEntity) {
        return of(PDSPBEpathwayEntity);
    }
}

class PathwayPresenter implements PDSPBPHttpPathwayPort {
    present(PDSPBEpathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: PDSPBEpathwayEntity.description?.value ?? '',
            id: PDSPBEpathwayEntity.id?.value ?? '',
            researchField: PDSPBEpathwayEntity.researchField?.value ?? '',
            title: PDSPBEpathwayEntity.title?.value ?? '',
        };
    }
}

@binding()
export default class ControllerSteps {
    private PDSPBUinitPathwayUseCase = new PDSPBUInitPathwayUsecase();
    private result: PDSPBPHttpPathwayPortOutput | undefined;
    private error: Error | undefined;

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        try {
            const firstRow = dataTable.hashes()[0] as PathwayInitDto;

            this.result = await firstValueFrom(
                this.PDSPBUinitPathwayUseCase.execute(
                    new InitPathwayMemory(),
                    new PathwayPresenter(),
                    {
                        title: firstRow.title,
                        description: firstRow.description,
                        researchField: firstRow.researchField,
                    }
                )
            );
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should receive the attributes of the pathway')
    public thenIShouldReceiveAttributesPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as PathwayInitDto;

        assert.equal(this.result?.title, firstRow.title);
        assert.equal(this.result?.description, firstRow.description);
        assert.equal(this.result?.researchField, firstRow.researchField);
    }

    @then(
        'I should see an error message {string} during initialization of the pathway'
    )
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.equal(this.error?.message, errorMessage);
    }
}
