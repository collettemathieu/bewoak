// import { strict as assert } from 'node:assert';
// import type {
//     PDSPBEPathwayEntity,
//     PDSPBPInitializePathwayPersistencePort,
//     PDSPBPPathwayPresenterPort,
//     PDSPBPPathwayPresenters,
// } from '@bewoak/pathway-design-server-pathway-business';
// import type { DataTable } from '@cucumber/cucumber';
// import type { EventPublisher } from '@nestjs/cqrs';
// import { before, binding, then, when } from 'cucumber-tsflow';
// import sinon from 'sinon';
// import { PDSPAIUInitializePathwayUsecase } from '../usecase/initialize-pathway.usecase';

// class FakeInitializePathwayPersistence implements PDSPBPInitializePathwayPersistencePort {
//     save(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
//         return Promise.resolve(pDSPBEPathwayEntity);
//     }
// }

// class FakePathwayPresenter implements PDSPBPPathwayPresenterPort {
//     present(pDSPBEPathwayEntity: PDSPBEPathwayEntity) {
//         return {
//             description: pDSPBEPathwayEntity.description,
//             id: pDSPBEPathwayEntity.id,
//             researchField: pDSPBEPathwayEntity.researchField,
//             title: pDSPBEPathwayEntity.title,
//         };
//     }
// }

// class FakeEventPublisher {
//     static isEventPublished = false;

//     mergeObjectContext(object: PDSPBEPathwayEntity) {
//         object.publishAll = () => {
//             FakeEventPublisher.isEventPublished = true;
//         };

//         return object;
//     }
// }

// @binding()
// export default class ControllerSteps {
//     private readonly fakeEventPublisher = new FakeEventPublisher();
//     private readonly fakeInitializePathwayPersistence = new FakeInitializePathwayPersistence();
//     private readonly fakePathwayPresenter = new FakePathwayPresenter();
//     private readonly pDSPBUInitPathwayUseCase = new PDSPAIUInitializePathwayUsecase();
//     private persistenceSpy: sinon.SinonSpy | undefined;
//     private presenterSpy: sinon.SinonSpy | undefined;
//     private result: PDSPBPPathwayPresenters | undefined;

//     @before()
//     public before() {
//         this.persistenceSpy = sinon.spy(this.fakeInitializePathwayPersistence, 'save');
//         this.presenterSpy = sinon.spy(this.fakePathwayPresenter, 'present');
//     }

//     @when('I initialize a pathway in application with these data')
//     public async whenIInitiateAPathway(dataTable: DataTable) {
//         const firstRow = dataTable.hashes()[0] as {
//             title: string;
//             description: string;
//             researchField: string;
//         };

//         this.result = await this.pDSPBUInitPathwayUseCase.execute(
//             this.fakeInitializePathwayPersistence,
//             this.fakePathwayPresenter,
//             this.fakeEventPublisher as EventPublisher,
//             {
//                 title: firstRow.title,
//                 description: firstRow.description,
//                 researchField: firstRow.researchField,
//             }
//         );
//     }

//     @then('I should receive the attributes of the pathway initialized')
//     public thenIShouldReceivePathwayAttributes(dataTable: DataTable) {
//         const firstRow = dataTable.hashes()[0] as {
//             title: string;
//             description: string;
//             researchField: string;
//         };

//         assert.strictEqual(this.result?.title, firstRow.title);
//         assert.strictEqual(this.result?.description, firstRow.description);
//         assert.strictEqual(this.result?.researchField, firstRow.researchField);
//     }

//     @then('It should call the persistence layer to save the pathway')
//     public thenThePersistenceLayerShouldBeCalled() {
//         assert(this.persistenceSpy?.calledOnce);
//     }

//     @then('It should call the presenter to present the pathway initialized')
//     public thenThePresenterShouldBeCalled() {
//         assert(this.presenterSpy?.calledOnce);
//     }

//     @then('It should emit an event indicating that the pathway has been initialized')
//     public thenAnEventShouldBeEmitted() {
//         assert.ok(FakeEventPublisher.isEventPublished);
//     }
// }
