import { strict as assert } from 'node:assert';

import {
    PDSPBEPathwayEntity,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import { PDSPBUChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';

@binding()
export default class ControllerSteps {
    private PDSPBUchangeTitlePathwayUseCase =
        new PDSPBUChangeTitlePathwayUseCase();
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity =
        new PDSPBEPathwayEntity();
    private error: Error | undefined;

    @given('I have a pathway with these data')
    public givenIHaveAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.pDSPBEPathwayEntity = pDSPBFPathwayFactory({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });
    }

    @when('I want to change the title of the pathway to {string}')
    public whenIChangeTheTitleOfThePathwayTo(title: string) {
        try {
            this.PDSPBUchangeTitlePathwayUseCase.execute({
                pathway: this.pDSPBEPathwayEntity,
                title,
            });
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should see the title of the pathway changed to {string}')
    public thenIShouldSeeTheTitleOfThePathwayChangedTo(title: string) {
        assert.strictEqual(this.pDSPBEPathwayEntity.title, title);
    }

    @then('I should see an error message {string} during the title change')
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.strictEqual(this.error?.message, errorMessage);
    }
}
