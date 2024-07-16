import { strict as assert } from 'node:assert';

import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import { PathwayDesignServerPathwayBusinessEntitiesPathway } from '../../entities/pathway';
import { pathwayFactory } from '../../factories/pathway';
import type { PathwayInitDto } from '../../factories/pathway.dto';
import { PathwayDesignServerPathwayBusinessUsecasesChangeNamePathway } from './index.usecase';

@binding()
export default class ControllerSteps {
    private pathwayDesignServerPathwayBusinessUsecasesChangeNamePathway =
        new PathwayDesignServerPathwayBusinessUsecasesChangeNamePathway();
    private pathwayDesignServerPathwayBusinessEntitiesPathway: PathwayDesignServerPathwayBusinessEntitiesPathway =
        new PathwayDesignServerPathwayBusinessEntitiesPathway();
    private error: Error | undefined;

    @given('I have a pathway with these data')
    public givenIHaveAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as PathwayInitDto;

        this.pathwayDesignServerPathwayBusinessEntitiesPathway = pathwayFactory(
            {
                title: firstRow.title,
                description: firstRow.description,
                researchField: firstRow.researchField,
            }
        );
    }

    @when('I want to change the title of the pathway to {string}')
    public whenIChangeTheTitleOfThePathwayTo(title: string) {
        try {
            this.pathwayDesignServerPathwayBusinessUsecasesChangeNamePathway.execute(
                {
                    pathway:
                        this.pathwayDesignServerPathwayBusinessEntitiesPathway,
                    title,
                }
            );
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should see the title of the pathway changed to {string}')
    public thenIShouldSeeTheTitleOfThePathwayChangedTo(title: string) {
        assert.equal(
            this.pathwayDesignServerPathwayBusinessEntitiesPathway?.title
                ?.value,
            title
        );
    }

    @then('I should see an error message {string} during the title change')
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.equal(this.error?.message, errorMessage);
    }
}
