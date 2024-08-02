import { strict as assert } from 'node:assert';

import type { PDSPBPInitializePathwayPersistencePort } from '@bewoak/pathway-design-server-pathway-business';
import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import type { PathwayInitDto } from '../../factories/pathway.dto';
import type {
    PDSPBPToJsonPathwayPresenterPort,
    PDSPBPToJsonPathwayPresenterPortOutput,
} from '../../ports/presenters/to-json-pathway.port';
import { PDSPBUInitializePathwayUsecase } from './initialize-pathway.usecase';

class InitializePathwayPersistence
    implements PDSPBPInitializePathwayPersistencePort
{
    save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return Promise.resolve(pDSPBEPathwayEntity);
    }
}

class ToJsonPathwayPresenter implements PDSPBPToJsonPathwayPresenterPort {
    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description?.value ?? '',
            id: pDSPBEPathwayEntity.id?.value ?? '',
            researchField: pDSPBEPathwayEntity.researchField?.value ?? '',
            title: pDSPBEPathwayEntity.title?.value ?? '',
        };
    }
}

@binding()
export default class ControllerSteps {
    private pDSPBUInitPathwayUseCase = new PDSPBUInitializePathwayUsecase();
    private result: PDSPBPToJsonPathwayPresenterPortOutput | undefined;
    private error: Error | undefined;

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        try {
            const firstRow = dataTable.hashes()[0] as PathwayInitDto;

            this.result = await this.pDSPBUInitPathwayUseCase.execute(
                new InitializePathwayPersistence(),
                new ToJsonPathwayPresenter(),
                {
                    title: firstRow.title,
                    description: firstRow.description,
                    researchField: firstRow.researchField,
                }
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
