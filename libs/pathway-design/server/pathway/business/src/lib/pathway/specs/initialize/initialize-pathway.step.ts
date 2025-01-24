import { strict as assert } from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import { uuidv7 } from 'uuidv7';
import { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayInitializedEvent } from '../../events/pathway-initialized.event';
import { PathwayDescriptionValueObject } from '../../value-objects/pathway-description.value-object';
import { PathwayIdValueObject } from '../../value-objects/pathway-id.value-object';
import { PathwayResearchFieldValueObject } from '../../value-objects/pathway-research-field.value-object';
import { PathwayTitleValueObject } from '../../value-objects/pathway-title.value-object';

@binding()
export default class PathwaySteps {
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;
    private applyMethodSpy: sinon.SinonSpy | undefined;

    @when('I initialize a pathway in business with these data')
    public async whenIInitializeAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };
        try {
            const pathwayId = new PathwayIdValueObject(uuidv7());
            const title = new PathwayTitleValueObject(data.title);
            const description = new PathwayDescriptionValueObject(data.description);
            const researchField = new PathwayResearchFieldValueObject(data.researchField);

            this.pDSPBEPathwayEntity = new PDSPBEPathwayEntity();
            this.applyMethodSpy = sinon.spy(this.pDSPBEPathwayEntity, 'apply');

            this.pDSPBEPathwayEntity.initialize({
                pathwayId,
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
            title: string;
            description: string;
            researchField: string;
        };

        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        assert.strictEqual(this.pDSPBEPathwayEntity.title, data.title);
        assert.strictEqual(this.pDSPBEPathwayEntity.description, data.description);
        assert.strictEqual(this.pDSPBEPathwayEntity.researchField, data.researchField);
    }

    @then('It should apply an event indicating that the pathway has been initialized')
    public thenItShouldApplyAnEvent() {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        const expectedEvent = new PDSPBEPathwayInitializedEvent(this.pDSPBEPathwayEntity.pathwayId, {
            pathwayId: this.pDSPBEPathwayEntity.pathwayId,
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
