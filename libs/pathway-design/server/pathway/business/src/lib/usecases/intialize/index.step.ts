import { strict as assert } from 'node:assert';

import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import { type Observable, firstValueFrom, of } from 'rxjs';
import type { PathwayDesignServerPathwayBusinessEntitiesPathway } from '../../entities/pathway';
import type { PathwayInitDto } from '../../factories/pathway.dto';
import type { PathwayDesignServerPathwayBusinessPortsInitPathwayMemory } from '../../ports/initialize/index.memory';
import { PathwayDesignServerPathwayBusinessUsecasesInitPathway } from './index.usecase';

class InitPathwayMemory
    implements PathwayDesignServerPathwayBusinessPortsInitPathwayMemory
{
    save(
        pathwayDesignServerPathwayBusinessEntitiesPathway: PathwayDesignServerPathwayBusinessEntitiesPathway
    ): Observable<PathwayDesignServerPathwayBusinessEntitiesPathway> {
        return of(pathwayDesignServerPathwayBusinessEntitiesPathway);
    }
}

@binding()
export default class ControllerSteps {
    private pathwayDesignServerPathwayBusinessUsecasesInitPathway =
        new PathwayDesignServerPathwayBusinessUsecasesInitPathway();
    private pathwayDesignServerPathwayBusinessEntitiesPathway:
        | PathwayDesignServerPathwayBusinessEntitiesPathway
        | undefined;
    private error: Error | undefined;

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        try {
            const firstRow = dataTable.hashes()[0] as PathwayInitDto;

            this.pathwayDesignServerPathwayBusinessEntitiesPathway =
                await firstValueFrom(
                    this.pathwayDesignServerPathwayBusinessUsecasesInitPathway.execute(
                        new InitPathwayMemory(),
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

    @then('I should retrieve a pathway initialized with its data')
    public thenIShouldSeeAPathwayInitiated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as PathwayInitDto;

        assert.equal(
            this.pathwayDesignServerPathwayBusinessEntitiesPathway?.title
                ?.value,
            firstRow.title
        );
        assert.equal(
            this.pathwayDesignServerPathwayBusinessEntitiesPathway?.description
                ?.value,
            firstRow.description
        );
        assert.equal(
            this.pathwayDesignServerPathwayBusinessEntitiesPathway
                ?.researchField?.value,
            firstRow.researchField
        );
    }

    @then('I should see an error message {string} during initialization')
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.equal(this.error?.message, errorMessage);
    }
}
