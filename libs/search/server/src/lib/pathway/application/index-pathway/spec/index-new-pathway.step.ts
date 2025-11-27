import { strict as assert } from 'node:assert';
import type { CTSEException } from '@bewoak/common-http-exceptions-server';
import { failureValue, success, successValue } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import { before, binding, given, then } from 'cucumber-tsflow';
import * as sinon from 'sinon';
import { PathwayInMemoryEntity } from '../../../infrastructure/persistence/common/in-memory/entities/in-memory-pathway.entity';
import type { PathwayEntity } from '../../../models/entities/pathway';
import type { IndexPathwayPersistence } from '../../../models/ports/persistences/index/index-pathway-persitence.port';
import { IndexPathwayService } from '../Service/index-pathway.service';
import type { PathwayIndexData } from '../Service/index-pathway.types';

class FakeIndexPathwayPersistence implements IndexPathwayPersistence {
    private pathwayInMemoryEntity: PathwayInMemoryEntity | null = null;

    public get result() {
        return this.pathwayInMemoryEntity;
    }

    index(pathwayEntity: PathwayEntity) {
        this.pathwayInMemoryEntity = new PathwayInMemoryEntity(
            pathwayEntity.createdAt,
            pathwayEntity.description,
            pathwayEntity.pathwayId,
            pathwayEntity.researchField,
            pathwayEntity.title,
            pathwayEntity.updatedAt,
            '1'
        );
        return Promise.resolve(success(pathwayEntity));
    }
}

@binding()
export default class ControllerSteps {
    private readonly fakeIndexPathwayPersistence = new FakeIndexPathwayPersistence();
    private readonly indexPathwayService = new IndexPathwayService(this.fakeIndexPathwayPersistence);
    private persistenceSpy: sinon.SinonSpy | undefined;
    private pathwayData: PathwayIndexData | undefined;
    private result: PathwayEntity | undefined;
    private failure: CTSEException | undefined;

    @before()
    public before() {
        this.persistenceSpy = sinon.spy(this.fakeIndexPathwayPersistence, 'index');
    }

    @given('a new pathway with the following details has been created:')
    public aNewPathwayHasBeenCreated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
            pathwayId: string;
        };

        this.pathwayData = {
            description: firstRow.description,
            pathwayId: firstRow.pathwayId,
            researchField: firstRow.researchField,
            title: firstRow.title,
        };
    }

    @then('the pathway should be indexed in the search system')
    public async thenPathwayShouldBeIndexed() {
        if (this.pathwayData === undefined) {
            throw new Error('Pathway data is not defined');
        }

        const beforeExecution = new Date();

        this.result = successValue(
            await this.indexPathwayService.indexPathway({
                ...this.pathwayData,
            })
        );

        const afterExecution = new Date();

        assert(this.persistenceSpy?.calledOnce);

        assert.strictEqual(this.result.pathwayId, this.pathwayData.pathwayId);
        assert.strictEqual(this.result.title, this.pathwayData.title);
        assert.strictEqual(this.result.description, this.pathwayData.description);
        assert.strictEqual(this.result.researchField, this.pathwayData.researchField);

        assert(this.result.createdAt instanceof Date, 'createdAt should be a Date instance');
        assert(this.result.updatedAt instanceof Date, 'updatedAt should be a Date instance');
        assert(this.result.createdAt >= beforeExecution, 'createdAt should be after or equal to beforeExecution');
        assert(this.result.createdAt <= afterExecution, 'createdAt should be before or equal to afterExecution');
        assert(this.result.updatedAt >= beforeExecution, 'updatedAt should be after or equal to beforeExecution');
        assert(this.result.updatedAt <= afterExecution, 'updatedAt should be before or equal to afterExecution');
        assert.strictEqual(
            this.result.createdAt.getTime(),
            this.result.updatedAt.getTime(),
            'createdAt and updatedAt should be equal for a new pathway'
        );

        assert(this.failure === undefined, 'There should be no failure during indexing');
    }

    @then('the indexed pathway should have the following details:')
    public theIndexedPathwayShouldHaveTheFollowingDetails(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
            pathwayId: string;
        };

        const pathwayInMemoryEntity = this.fakeIndexPathwayPersistence.result;
        if (!pathwayInMemoryEntity) {
            throw new Error('No pathway entity was indexed');
        }

        assert.strictEqual(pathwayInMemoryEntity.id, '1');
        assert.strictEqual(pathwayInMemoryEntity.title, firstRow.title);
        assert.strictEqual(pathwayInMemoryEntity.description, firstRow.description);
        assert.strictEqual(pathwayInMemoryEntity.researchField, firstRow.researchField);
        assert.strictEqual(pathwayInMemoryEntity.pathwayId, firstRow.pathwayId);
    }

    @then('an error should occur during indexing')
    public async thenAnErrorShouldOccurDuringIndexing() {
        if (this.pathwayData === undefined) {
            throw new Error('Pathway data is not defined');
        }

        this.failure = failureValue(
            await this.indexPathwayService.indexPathway({
                ...this.pathwayData,
            })
        );
        assert(this.persistenceSpy?.notCalled);
        assert(this.failure !== undefined, 'An error should have occurred during indexing');
    }

    @then('the pathway should not be indexed in the search system')
    public thenPathwayShouldNotBeIndexed() {
        assert(this.fakeIndexPathwayPersistence.result === null, 'Pathway should not be indexed');
    }
}
