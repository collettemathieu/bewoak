import { strict as assert } from 'node:assert';
import { success, successValue } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import { before, binding, given, then } from 'cucumber-tsflow';
import * as sinon from 'sinon';
import { PathwayInMemoryEntity } from '../../../infrastructure/persistence/common/in-memory/entities/in-memory-pathway.entity';
import type { PathwayEntity } from '../../../models/entities/pathway';
import type { IndexPathwayPersistence } from '../../../models/ports/persistences/index/index-pathway-persitence.port';
import { IndexPathwayService } from '../Service/index-pathway.service';
import type { PathwayIndexData } from '../Service/index-pathway.types';

class FakeIndexPathwayPersistence implements IndexPathwayPersistence {
    private pathwayEntity: PathwayInMemoryEntity | null = null;

    public get result() {
        return this.pathwayEntity;
    }

    index(pathwayEntity: PathwayEntity) {
        this.pathwayEntity = new PathwayInMemoryEntity(
            pathwayEntity.description,
            pathwayEntity.pathwayId,
            pathwayEntity.researchField,
            pathwayEntity.title,
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
            // createdAt: Date.now(),
            description: firstRow.description,
            pathwayId: firstRow.pathwayId,
            researchField: firstRow.researchField,
            title: firstRow.title,
            // updatedAt: Date.now(),
        };
    }

    @then('the pathway should be indexed in the search system')
    public async thenPathwayShouldBeIndexed() {
        if (this.pathwayData === undefined) {
            throw new Error('Pathway data is not defined');
        }

        this.result = successValue(
            await this.indexPathwayService.indexPathway({
                ...this.pathwayData,
            })
        );

        assert(this.persistenceSpy?.calledOnce);

        assert.strictEqual(this.result.pathwayId, this.pathwayData.pathwayId);
        assert.strictEqual(this.result.title, this.pathwayData.title);
        assert.strictEqual(this.result.description, this.pathwayData.description);
        assert.strictEqual(this.result.researchField, this.pathwayData.researchField);
    }

    @then('the indexed pathway should have the following details:')
    public theIndexedPathwayShouldHaveTheFollowingDetails(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
            pathwayId: string;
        };

        const pathwayEntity = this.fakeIndexPathwayPersistence.result;
        if (!pathwayEntity) {
            throw new Error('No pathway entity was indexed');
        }

        assert.strictEqual(pathwayEntity.id, '1');
        assert.strictEqual(pathwayEntity.title, firstRow.title);
        assert.strictEqual(pathwayEntity.description, firstRow.description);
        assert.strictEqual(pathwayEntity.researchField, firstRow.researchField);
        assert.strictEqual(pathwayEntity.pathwayId, firstRow.pathwayId);
    }
}
