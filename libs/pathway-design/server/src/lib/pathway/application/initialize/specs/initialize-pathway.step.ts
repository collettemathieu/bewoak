import { strict as assert } from 'node:assert';
import { type CTSEException, CTSEInternalServerException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { failure, success } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import type { EventPublisher } from '@nestjs/cqrs';
import { before, binding, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import type { PathwayEntity } from '../../../business/pathway/entities/pathway';
import { INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE } from '../../../business/pathway/entities/pathway.constants';
import type { InitializePathwayPersistence } from '../../../business/pathway/ports/persistences/initialize/initialize-pathway-persitence.port';
import type {
    PathwayPresenter,
    PathwayPresenterResult,
    PathwayPresenters,
} from '../../../business/pathway/ports/presenters/pathway-presenter.port';
import { InitializePathwayUsecase } from '../usecase/initialize-pathway.usecase';

class FakeSuccessInitializePathwayPersistence implements InitializePathwayPersistence {
    save(pathwayEntity: PathwayEntity) {
        return Promise.resolve(success(pathwayEntity));
    }
}

class FakeFailureInitializePathwayPersistence implements InitializePathwayPersistence {
    save(_pathwayEntity: PathwayEntity) {
        return Promise.resolve(failure(new CTSEInternalServerException('Pathway was not been added in memory')));
    }
}

class FakePathwayPresenter implements PathwayPresenter {
    exception(exception: CTSEException) {
        return exception;
    }
    present(pathwayEntity: PathwayEntity) {
        return {
            description: pathwayEntity.description,
            pathwayId: pathwayEntity.pathwayId,
            researchField: pathwayEntity.researchField,
            title: pathwayEntity.title,
        };
    }
}

class FakeEventPublisher {
    static isEventPublished = false;

    mergeObjectContext(object: PathwayEntity) {
        object.publishAll = () => {
            FakeEventPublisher.isEventPublished = true;
        };

        return object;
    }
}

@binding()
export default class ControllerSteps {
    private persistenceSpy: sinon.SinonSpy | undefined;
    private presenterSpy: sinon.SinonSpy | undefined;
    private readonly fakeEventPublisher = new FakeEventPublisher();
    private readonly fakeFailureInitializePathwayPersistence = new FakeFailureInitializePathwayPersistence();
    private readonly fakePathwayPresenter = new FakePathwayPresenter();
    private readonly fakeSuccessInitializePathwayPersistence = new FakeSuccessInitializePathwayPersistence();
    private readonly initPathwayUseCase = new InitializePathwayUsecase();
    private result: PathwayPresenterResult | undefined;

    @before()
    public before() {
        this.persistenceSpy = sinon.spy(this.fakeSuccessInitializePathwayPersistence, 'save');
        this.presenterSpy = sinon.spy(this.fakePathwayPresenter, 'present');
    }

    @when('I initialize a pathway in application with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.result = await this.initPathwayUseCase.execute(
            this.fakeSuccessInitializePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            }
        );
    }

    @when('I initialize a pathway in application with these data but the persistence layer fails')
    public async whenIInitiateAPathwayButPersistenceLayerFails(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.result = await this.initPathwayUseCase.execute(
            this.fakeFailureInitializePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            }
        );
    }

    @when('I initialize a pathway in application with these invalid data')
    public async whenIInitiateAPathwayWithInvalidData(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.result = await this.initPathwayUseCase.execute(
            this.fakeSuccessInitializePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            }
        );
    }

    @then('I should receive the attributes of the pathway initialized')
    public thenIShouldReceivePathwayAttributes(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const result = this.result as PathwayPresenters;

        assert.strictEqual(result.title, firstRow.title);
        assert.strictEqual(result.description, firstRow.description);
        assert.strictEqual(result.researchField, firstRow.researchField);
    }

    @then('It should call the persistence layer to save the pathway')
    public thenThePersistenceLayerShouldBeCalled() {
        assert(this.persistenceSpy?.calledOnce);
    }

    @then('It should call the presenter to present the pathway initialized')
    public thenThePresenterShouldBeCalled() {
        assert(this.presenterSpy?.calledOnce);
    }

    @then('It should emit an event indicating that the pathway has been initialized')
    public thenAnEventShouldBeEmitted() {
        assert.ok(FakeEventPublisher.isEventPublished);
    }

    @then('It should return an exception message indicating that the pathway could not be saved')
    public thenReturnExceptionMessageIndicatingPathwayNotSaved() {
        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const result = this.result as CTSEException;

        assert.strictEqual(result.message, 'Pathway was not been added in memory');
        assert.strictEqual(result.statusCode, HttpStatus.INTERNAL_SERVER_ERROR);
        assert.strictEqual(result.name, 'InternalServerException');
    }

    @then('It should return an exception message indicating why data are invalid')
    public thenReturnExceptionMessageIndicatingDataAreInvalid() {
        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const result = this.result as CTSEException;

        assert.strictEqual(result.message, INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE);
        assert.strictEqual(result.statusCode, HttpStatus.BAD_REQUEST);
        assert.strictEqual(result.name, 'BadRequestException');
    }
}
