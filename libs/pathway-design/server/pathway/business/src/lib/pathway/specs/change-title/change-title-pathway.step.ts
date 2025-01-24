import { strict as assert } from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayTitleChangedEvent } from '../../events/pathway-title-changed.event';
import { pDSPBFPathwayFactory } from '../../factories/pathway.factory';
import { PathwayTitleValueObject } from '../../value-objects/pathway-title.value-object';

@binding()
export default class ControllerSteps {
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;
    private applyMethodSpy: sinon.SinonSpy | undefined;

    @given('I have a pathway in business with these data')
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

    @when('I change the title of the pathway in business to {string}')
    public whenIChangeTheTitleOfPathway(newTitle: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        try {
            const title = new PathwayTitleValueObject(newTitle);
            this.applyMethodSpy = sinon.spy(this.pDSPBEPathwayEntity, 'apply');
            this.pDSPBEPathwayEntity.changeTitle(title);
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('It should apply an event indicating that the title of the pathway has been changed')
    public thenItShouldApplyAnEvent() {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        const expectedEvent = new PDSPBEPathwayTitleChangedEvent(this.pDSPBEPathwayEntity.pathwayId, {
            pathwayId: this.pDSPBEPathwayEntity.pathwayId,
            title: this.pDSPBEPathwayEntity.title,
        });
        const callArgs = this.applyMethodSpy?.getCall(0)?.args[0];

        assert(this.applyMethodSpy?.calledOnce);
        assert.deepStrictEqual(callArgs, expectedEvent);
    }

    @then('I should see the title of the pathway in business changed to {string}')
    public thenIShouldSeeTheTitleOfThePathwayChangedTo(title: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        assert.strictEqual(this.pDSPBEPathwayEntity.title, title);
    }

    @then('I should see an error message from business during the title change')
    public thenIShouldSeeAnErrorMessageDuringTitleChange() {
        assert.notEqual(this.error, undefined);
        assert.notEqual(this.error?.message, undefined);
        assert.notEqual(this.error?.message, '');
    }
}
