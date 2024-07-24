import { strict as assert } from 'node:assert';

import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import { type Observable, firstValueFrom, of } from 'rxjs';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import type { PathwayInitDto } from '../../factories/pathway.dto';
import type { PDSPBPInitPathwayMemoryPort } from '../../ports/initialize/init-port-memory.port';
import { PDSPBUInitPathwayUsecase } from './init-pathway.usecase';

class InitPathwayMemory implements PDSPBPInitPathwayMemoryPort {
    save(
        PDSPBEpathwayEntity: PDSPBEPathwayEntity
    ): Observable<PDSPBEPathwayEntity> {
        return of(PDSPBEpathwayEntity);
    }
}

@binding()
export default class ControllerSteps {
    private PDSPBUinitPathwayUseCase = new PDSPBUInitPathwayUsecase();
    private PDSPBEpathwayEntity: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        try {
            const firstRow = dataTable.hashes()[0] as PathwayInitDto;

            this.PDSPBEpathwayEntity = await firstValueFrom(
                this.PDSPBUinitPathwayUseCase.execute(new InitPathwayMemory(), {
                    title: firstRow.title,
                    description: firstRow.description,
                    researchField: firstRow.researchField,
                })
            );
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should retrieve a pathway initialized with its data')
    public thenIShouldSeeAPathwayInitiated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as PathwayInitDto;

        assert.equal(this.PDSPBEpathwayEntity?.title?.value, firstRow.title);
        assert.equal(
            this.PDSPBEpathwayEntity?.description?.value,
            firstRow.description
        );
        assert.equal(
            this.PDSPBEpathwayEntity?.researchField?.value,
            firstRow.researchField
        );
    }

    @then('I should see an error message {string} during initialization')
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.equal(this.error?.message, errorMessage);
    }
}
