import { strict as assert } from 'node:assert';
import { type CTSEException, CTSENotFoundRequestException, HttpStatus } from '@bewoak/common-http-exceptions-server';
import { failure, success, successValue } from '@bewoak/common-types-result';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway';
import type { DataTable } from '@cucumber/cucumber';
import type { EventPublisher } from '@nestjs/cqrs';
import { before, binding, given, then, when } from 'cucumber-tsflow';
import * as sinon from 'sinon';
import type { PathwayEntity } from '../../../business/pathway/entities/pathway';
import { pathwayFactory } from '../../../business/pathway/factories/pathway.factory';
import type { ChangeTitlePathwayPersistence } from '../../../business/pathway/ports/persistences/change-title/change-title-pathway-persitence.port';
import type {
    PathwayPresenter,
    PathwayPresenterResult,
    PathwayPresenters,
} from '../../../business/pathway/ports/presenters/pathway-presenter.port';
import { ChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';

class FakeChangeTitlePathwayPersistence implements ChangeTitlePathwayPersistence {
    private pathwayEntity: PathwayEntity | undefined;

    save(pathwayEntity: PathwayEntity) {
        this.pathwayEntity = pathwayEntity;
    }

    getPathwayByPathwayId(_pathwayId: string) {
        if (this.pathwayEntity === undefined) {
            return Promise.resolve(failure(new CTSENotFoundRequestException('Pathway not found in memory')));
        }

        return Promise.resolve(success(this.pathwayEntity));
    }

    changeTitle(pathway: PathwayEntity) {
        if (this.pathwayEntity === undefined) {
            return Promise.resolve(failure(new CTSENotFoundRequestException('Pathway not found in memory')));
        }

        if (this.pathwayEntity.pathwayId !== pathway.pathwayId) {
            throw new Error('Pathway id does not match');
        }

        const pathwayWithTitleChanged = successValue(
            pathwayFactory({
                description: this.pathwayEntity.description,
                pathwayId: this.pathwayEntity.pathwayId,
                researchField: this.pathwayEntity.researchField,
                title: pathway.title,
            })
        );
        return Promise.resolve(success(pathwayWithTitleChanged));
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
    private readonly changeTitlePathwayUseCase = new ChangeTitlePathwayUseCase();
    private pathwayEntity: PathwayEntity | undefined;
    private readonly fakeEventPublisher = new FakeEventPublisher();
    private readonly fakeChangeTitlePathwayPersistence = new FakeChangeTitlePathwayPersistence();
    private readonly fakePathwayPresenter = new FakePathwayPresenter();
    private persistenceSpy: sinon.SinonSpy | undefined;
    private presenterSpy: sinon.SinonSpy | undefined;
    private result: PathwayPresenterResult | undefined;

    @before()
    public before() {
        this.persistenceSpy = sinon.spy(this.fakeChangeTitlePathwayPersistence, 'changeTitle');
        this.presenterSpy = sinon.spy(this.fakePathwayPresenter, 'present');
    }

    @given('I have a pathway in application with these data')
    public givenIHaveAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.pathwayEntity = successValue(
            pathwayFactory({
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            })
        );

        this.fakeChangeTitlePathwayPersistence.save(this.pathwayEntity);
    }

    @when('I want to change the title of the pathway in application to {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        if (this.pathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        this.result = await this.changeTitlePathwayUseCase.execute(
            this.fakeChangeTitlePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                pathwayId: this.pathwayEntity.pathwayId,
                title,
            }
        );
    }

    @when('No pathway is initialized in application')
    public async whenNoPathwayIsInitialized() {
        this.result = await this.changeTitlePathwayUseCase.execute(
            this.fakeChangeTitlePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                pathwayId: 'unknown',
                title: 'unknown',
            }
        );
    }

    @then('It should call the persistence layer to modify the title of the pathway')
    public thenPersistenceLayerShouldBeCalled() {
        assert(this.persistenceSpy?.calledOnce);
    }

    @then('It should call the presenter to present the pathway with its new title')
    public thenPresenterShouldBeCalled() {
        assert(this.presenterSpy?.calledOnce);
    }

    @then('It should emit an event indicating that the title of the pathway has been changed')
    public thenAnEventShouldBeEmitted() {
        assert.ok(FakeEventPublisher.isEventPublished);
    }

    @then('I should receive the pathway with its new title')
    public thenIShouldReceiveThePathway(dataTable: DataTable) {
        if (this.pathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const firstRow = dataTable.hashes()[0] as {
            title: string;
        };

        const result = this.result as PathwayPresenters;

        assert.strictEqual(result?.title, firstRow.title);
        assert.strictEqual(result?.description, this.pathwayEntity.description);
        assert.strictEqual(result?.researchField, this.pathwayEntity.researchField);
    }

    @then('It should return an exception message indicating that the pathway is not found')
    public thenAnNotFoundExceptionShouldBeReturned() {
        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const result = this.result as CTSEException;

        assert.strictEqual(result.message, 'Pathway not found in memory');
        assert.strictEqual(result.statusCode, HttpStatus.NOT_FOUND);
        assert.strictEqual(result.name, 'NotFoundRequestException');
    }

    @then('It should return an exception message indicating that the new title is invalid')
    public thenAnBadRequestExceptionShouldBeReturned() {
        if (this.result === undefined) {
            throw new Error('Result is undefined');
        }

        const result = this.result as CTSEException;

        assert.strictEqual(result.message, pDCPBRPathwayTitleRules.textError());
        assert.strictEqual(result.statusCode, HttpStatus.BAD_REQUEST);
        assert.strictEqual(result.name, 'BadRequestException');
    }
}
