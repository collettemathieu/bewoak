import { strict as assert } from 'node:assert';

import {
    type PDSPBEPathwayEntity,
    type PDSPBPChangeTitlePathwayPersistencePort,
    type PDSPBPPathwayPresenterPort,
    type PDSPBPPathwayPresenters,
    pDSPBFPathwayFactory,
} from '@bewoak/pathway-design-server-pathway-business';
import type { DataTable } from '@cucumber/cucumber';
import type { EventPublisher } from '@nestjs/cqrs';
import { before, binding, given, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import { PDSPACUChangeTitlePathwayUseCase } from '../usecase/change-title-pathway.usecase';

class FakeChangeTitlePathwayPersistence implements PDSPBPChangeTitlePathwayPersistencePort {
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;

    save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        this.pDSPBEPathwayEntity = pDSPBEPathwayEntity;
    }

    changeTitle(pathwayId: string, title: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        if (this.pDSPBEPathwayEntity.id !== pathwayId) {
            throw new Error('Pathway id does not match');
        }

        const pathwayWithTitleChanged = pDSPBFPathwayFactory({
            description: this.pDSPBEPathwayEntity.description,
            id: this.pDSPBEPathwayEntity.id,
            researchField: this.pDSPBEPathwayEntity.researchField,
            title,
        });
        return Promise.resolve(pathwayWithTitleChanged);
    }
}

class FakePathwayPresenter implements PDSPBPPathwayPresenterPort {
    present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
        return {
            description: pDSPBEPathwayEntity.description,
            id: pDSPBEPathwayEntity.id,
            researchField: pDSPBEPathwayEntity.researchField,
            title: pDSPBEPathwayEntity.title,
        };
    }
}

class FakeEventPublisher {
    static isEventPublished = false;

    mergeObjectContext(object: PDSPBEPathwayEntity) {
        object.publishAll = () => {
            FakeEventPublisher.isEventPublished = true;
        };

        return object;
    }
}

@binding()
export default class ControllerSteps {
    private pDSPACUchangeTitlePathwayUseCase = new PDSPACUChangeTitlePathwayUseCase();
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private fakeEventPublisher = new FakeEventPublisher();
    private fakeChangeTitlePathwayPersistence = new FakeChangeTitlePathwayPersistence();
    private fakePathwayPresenter = new FakePathwayPresenter();
    private persistenceSpy: sinon.SinonSpy | undefined;
    private presenterSpy: sinon.SinonSpy | undefined;
    private result: PDSPBPPathwayPresenters | undefined;

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

        this.pDSPBEPathwayEntity = pDSPBFPathwayFactory({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });

        this.fakeChangeTitlePathwayPersistence.save(this.pDSPBEPathwayEntity);
    }

    @when('I want to change the title of the pathway in application to {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        this.result = await this.pDSPACUchangeTitlePathwayUseCase.execute(
            this.fakeChangeTitlePathwayPersistence,
            this.fakePathwayPresenter,
            this.fakeEventPublisher as EventPublisher,
            {
                pathwayId: this.pDSPBEPathwayEntity.id,
                title,
            }
        );
    }

    @then('It should call the persistence layer to modify the title of the pathway')
    public thenItShouldCallThePersistenceLayerToModifyTheTitleOfThePathway() {
        assert(this.persistenceSpy?.calledOnce);
    }

    @then('It should call the presenter to return the new title of the pathway')
    public thenItShouldCallThePresenterToPresentThePathway() {
        assert(this.presenterSpy?.calledOnce);
    }

    @then('It should emit an event indicating that the title of the pathway has been changed')
    public thenItShouldEmitAnEventIndicatingThatTheTitlePathwayHasBeenChanged() {
        assert.ok(FakeEventPublisher.isEventPublished);
    }

    @then('I should receive the new title of the pathway')
    public thenIShouldReceiveTheNewTitleOfPathway(dataTable: DataTable) {
        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        const firstRow = dataTable.hashes()[0] as {
            title: string;
        };

        assert.strictEqual(this.result?.title, firstRow.title);
        assert.strictEqual(this.result?.description, this.pDSPBEPathwayEntity.description);
        assert.strictEqual(this.result?.researchField, this.pDSPBEPathwayEntity.researchField);
    }
}
