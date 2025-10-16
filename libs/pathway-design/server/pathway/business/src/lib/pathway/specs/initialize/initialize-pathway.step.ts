import { strict as assert } from 'node:assert';
import type { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failureValue, type Result, successValue } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import { binding, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import { uuidv7 } from 'uuidv7';
import { PDSPBEPathwayEntity } from '../../entities/pathway';
import { PDSPBEPathwayInitializedEvent } from '../../events/pathway-initialized.event';

@binding()
export default class PathwaySteps {
    private applyMethodSpy: sinon.SinonSpy | undefined;
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private result: Result<PDSPBEPathwayEntity, CTSEBadRequestException> | undefined;

    @when('I initialize a pathway in business with these data')
    public async whenIInitializeAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            title: string | undefined;
            description: string | undefined;
            researchField: string | undefined;
        };

        this.pDSPBEPathwayEntity = new PDSPBEPathwayEntity();
        this.applyMethodSpy = sinon.spy(this.pDSPBEPathwayEntity, 'apply');

        this.result = this.pDSPBEPathwayEntity.initialize({
            pathwayId: uuidv7(),
            title: data?.title ?? '',
            description: data?.description ?? '',
            researchField: data?.researchField ?? '',
        });
    }

    @then('I should retrieve the attributes of the pathway from business')
    public thenIShouldRetrieveAttributesPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        if (this.result === undefined) {
            throw new Error('No Pathway initialized');
        }

        const pathway = successValue(this.result);

        assert.strictEqual(pathway.title, data.title);
        assert.strictEqual(pathway.description, data.description);
        assert.strictEqual(pathway.researchField, data.researchField);
    }

    @then('It should apply an event indicating that the pathway has been initialized')
    public thenItShouldApplyAnEvent() {
        if (this.result === undefined) {
            throw new Error('No Pathway initialized');
        }

        const pathway = successValue(this.result);

        const expectedEvent = new PDSPBEPathwayInitializedEvent(pathway.pathwayId, {
            pathwayId: pathway.pathwayId,
            title: pathway.title,
            description: pathway.description,
            researchField: pathway.researchField,
        });
        const callArgs = this.applyMethodSpy?.getCall(0).args[0];

        assert(this.applyMethodSpy?.calledOnce);
        assert.deepStrictEqual(callArgs, expectedEvent);
    }

    @then('I should see an error message from business during the initialization')
    public thenIShouldSeeAnErrorMessageDuringInitialization() {
        if (this.result === undefined) {
            throw new Error('No Pathway initialized');
        }

        const error = failureValue(this.result);

        assert.notEqual(error, undefined);
        assert.notEqual(error?.message, undefined);
        assert.notEqual(error?.message, '');
    }
}
