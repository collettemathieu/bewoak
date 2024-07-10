import { strict as assert } from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayInitializedEvent } from '../../events/pathway-initialized.event';
import { DescriptionValueObject } from '../../value-objects/description.value-object';
import { PathwayIdValueObject } from '../../value-objects/pathway-id.value-object';
import { ResearchFieldValueObjects } from '../../value-objects/research-field.value-object';
import { PDSPBVOTitleValueObjects } from '../../value-objects/title.value-object';

@binding()
export default class PathwaySteps {
    private pathway: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;
    private applySpy: sinon.SinonSpy | undefined;

    @given('I have initialized a pathway with these data')
    public givenIHaveInitializedAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            id: string;
            title: string;
            description: string;
            researchField: string;
        };

        const id = new PathwayIdValueObject(data.id);
        const title = new PDSPBVOTitleValueObjects(data.title);
        const description = new DescriptionValueObject(data.description);
        const researchField = new ResearchFieldValueObjects(data.researchField);

        this.pathway = new PDSPBEPathwayEntity();
        this.pathway.init({ id, title, description, researchField });
    }

    @when('I initialize a pathway with these data')
    public async whenIInitializeAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            id: string;
            title: string;
            description: string;
            researchField: string;
        };

        try {
            const id = new PathwayIdValueObject(data.id);
            const title = new PDSPBVOTitleValueObjects(data.title);
            const description = new DescriptionValueObject(data.description);
            const researchField = new ResearchFieldValueObjects(
                data.researchField
            );

            this.pathway = new PDSPBEPathwayEntity();
            this.applySpy = sinon.spy(this.pathway, 'apply');

            this.pathway.init({ id, title, description, researchField });
        } catch (error) {
            this.error = error as Error;
        }
    }

    @when('I change the title to {string}')
    public whenIChangeTheTitle(newTitle: string) {
        const title = new PDSPBVOTitleValueObjects(newTitle);
        this.pathway?.changeTitle(title);
    }

    @then('I should retrieve the attributes of the pathway')
    public thenIShouldRetrieveAttributesPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            id: string;
            title: string;
            description: string;
            researchField: string;
        };

        assert.strictEqual(this.pathway?.id, data.id);
        assert.strictEqual(this.pathway?.title, data.title);
        assert.strictEqual(this.pathway?.description, data.description);
        assert.strictEqual(this.pathway?.researchField, data.researchField);
    }

    @then(
        'It should apply an event indicating that the pathway has been initialized'
    )
    public thenItShouldApplyAnEvent() {
        const expectedEvent = new PDSPBEPathwayInitializedEvent(
            this.pathway as PDSPBEPathwayEntity
        );
        const callArgs = this.applySpy?.getCall(0).args[0];

        assert(this.applySpy?.calledOnce);
        assert.deepStrictEqual(callArgs, expectedEvent);
    }

    @then('I should see an error message {string}')
    public thenIShouldSeeAnErrorMessage(errorMessage: string) {
        assert.notEqual(this.error, undefined);
        assert.strictEqual(this.error?.message, errorMessage);
    }
}
