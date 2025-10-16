import { strict as assert } from 'node:assert';
import type { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, type Result, successValue } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayTitleChangedEvent } from '../../events/pathway-title-changed.event';
import { pDSPBFPathwayFactory } from '../../factories/pathway.factory';

@binding()
export default class ControllerSteps {
    private applyMethodSpy: sinon.SinonSpy | undefined;
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private result: Result<PDSPBEPathwayEntity, CTSEBadRequestException> | undefined;

    @given('I have a pathway in business with these valid data')
    public givenIHaveAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.pDSPBEPathwayEntity = successValue(
            pDSPBFPathwayFactory({
                title: firstRow.title,
                description: firstRow.description,
                researchField: firstRow.researchField,
            })
        );
    }

    @when('I change the title of the pathway in business to {string}')
    public whenIChangeTheTitleOfPathway(newTitle: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('No Pathway initialized');
        }

        this.applyMethodSpy = sinon.spy(this.pDSPBEPathwayEntity, 'apply');
        this.result = this.pDSPBEPathwayEntity.changeTitle(newTitle);
    }

    @then('It should apply an event indicating that the title of the pathway has been changed')
    public thenItShouldApplyAnEvent() {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('No Pathway initialized');
        }

        if (this.result === undefined) {
            throw new Error('No title changed');
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
    public thenIShouldSeeTheTitleOfThePathwayChangedTo(newTitle: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('No Pathway initialized');
        }

        if (this.result === undefined) {
            throw new Error('No title changed');
        }

        const pathway = successValue(this.result);

        assert.strictEqual(pathway.title, newTitle);
    }

    @then('I should see an error message from business during the title change')
    public thenIShouldSeeAnErrorMessageDuringTitleChange() {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('No Pathway initialized');
        }

        if (this.result === undefined) {
            throw new Error('No title changed');
        }

        const error = failureValue(this.result);

        assert.notEqual(error, undefined);
        assert.notEqual(error?.message, undefined);
        assert.notEqual(error?.message, '');
    }
}
