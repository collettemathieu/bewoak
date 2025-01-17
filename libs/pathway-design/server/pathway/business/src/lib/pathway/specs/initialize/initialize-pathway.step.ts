import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import { strict as assert } from 'node:assert';
import sinon from 'sinon';
import { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayInitializedEvent } from '../../events/pathway-initialized.event';
import { DescriptionValueObject } from '../../value-objects/description.value-object';
import { PathwayIdValueObject } from '../../value-objects/pathway-id.value-object';
import { ResearchFieldValueObjects } from '../../value-objects/research-field.value-object';
import { PDSPBVOTitleValueObjects } from '../../value-objects/title.value-object';

@binding()
export default class PathwaySteps {
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;
    private applyMethodSpy: sinon.SinonSpy | undefined;

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

        this.pDSPBEPathwayEntity = new PDSPBEPathwayEntity();
        this.pDSPBEPathwayEntity.initialize({
            id,
            title,
            description,
            researchField,
        });
    }

    @when('I initialize a pathway in business with these data')
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
            const researchField = new ResearchFieldValueObjects(data.researchField);

            this.pDSPBEPathwayEntity = new PDSPBEPathwayEntity();
            this.applyMethodSpy = sinon.spy(this.pDSPBEPathwayEntity, 'apply');

            this.pDSPBEPathwayEntity.initialize({
                id,
                title,
                description,
                researchField,
            });
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should retrieve the attributes of the pathway from business')
    public thenIShouldRetrieveAttributesPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            id: string;
            title: string;
            description: string;
            researchField: string;
        };

        assert.strictEqual(this.pDSPBEPathwayEntity?.id, data.id);
        assert.strictEqual(this.pDSPBEPathwayEntity?.title, data.title);
        assert.strictEqual(this.pDSPBEPathwayEntity?.description, data.description);
        assert.strictEqual(this.pDSPBEPathwayEntity?.researchField, data.researchField);
    }

    @then('It should apply an event indicating that the pathway has been initialized')
    public thenItShouldApplyAnEvent() {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        const expectedEvent = new PDSPBEPathwayInitializedEvent(this.pDSPBEPathwayEntity.id, {
            pathwayId: this.pDSPBEPathwayEntity.id,
            title: this.pDSPBEPathwayEntity.title,
            description: this.pDSPBEPathwayEntity.description,
            researchField: this.pDSPBEPathwayEntity.researchField,
        });
        const callArgs = this.applyMethodSpy?.getCall(0).args[0];

        assert(this.applyMethodSpy?.calledOnce);
        assert.deepStrictEqual(callArgs, expectedEvent);
    }

    @then('I should see an error message from business during the initialization')
    public thenIShouldSeeAnErrorMessageDuringInitialization() {
        assert.notEqual(this.error, undefined);
        assert.notEqual(this.error?.message, undefined);
        assert.notEqual(this.error?.message, '');
    }
}
