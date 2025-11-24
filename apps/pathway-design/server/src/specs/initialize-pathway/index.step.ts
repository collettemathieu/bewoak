import { strict as assert } from 'node:assert';
import { CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import {
    PDSPIAInitializePathwayInterfaceAdaptersModule,
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server';
import type { DataTable } from '@cucumber/cucumber';
import { HttpStatus } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import type * as fastify from 'fastify';
import * as sinon from 'sinon';

@binding()
class ControllerSteps {
    private app: NestFastifyApplication;
    private eventEmitter: EventEmitter2;
    private eventEmitterSpy: sinon.SinonSpy | undefined;
    private response: fastify.LightMyRequestResponse;

    @given('I am authenticated on the platform for initialize a pathway with {string} and {string}')
    public async connectToServer(presenter: PDSPPPresenterDriverAuthorized, persistence: PDSPIPPersistenceDriverAuthorized) {
        const testingModule = await Test.createTestingModule({
            exports: [],
            imports: [
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use(presenter))
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use(persistence))
                    .build(),
                CqrsModule.forRoot(),
                EventEmitterModule.forRoot({
                    delimiter: '.',
                    ignoreErrors: false,
                    maxListeners: 10,
                    newListener: false,
                    removeListener: false,
                    verboseMemoryLeak: true,
                    wildcard: false,
                }),
            ],
        }).compile();

        this.app = testingModule.createNestApplication(new FastifyAdapter());
        await this.app.init();

        this.eventEmitter = this.app.get(EventEmitter2);
        this.eventEmitterSpy = sinon.spy(this.eventEmitter, 'emitAsync');
    }

    @when('I want to initialize on the platform a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await this.app.inject({
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            payload: {
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            },
            url: '/pathway/initialize',
        });
    }

    @then('The platform should send an event to the event bus with the pathway initialized')
    public thenPlatformSendAnEventToEventBus() {
        const responseBody = JSON.parse(this.response.body);
        const expectedEvent = new CCEPPathwayInitializedEvent(
            responseBody.description,
            responseBody.pathwayId,
            responseBody.researchField,
            responseBody.title
        );

        const typeArg = this.eventEmitterSpy?.getCall(0).args[0];
        const eventArgs = this.eventEmitterSpy?.getCall(0).args[1];

        assert(this.eventEmitterSpy?.calledOnce);
        assert.deepStrictEqual(typeArg, expectedEvent.eventType);
        assert.deepStrictEqual(eventArgs, expectedEvent);
    }

    @then('I should retrieve from the platform a pathway initialized with its data')
    public thenIShouldRetrieveAPathwayInitiated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];
        const responseBody = JSON.parse(this.response.body);

        assert.strictEqual(responseBody.title, firstRow.title);
        assert.strictEqual(responseBody.description, firstRow.description);
        assert.strictEqual(responseBody.researchField, firstRow.researchField);
    }

    @then('The pathway received from the platform should be have a unique identifier')
    public thenThePathwayIdentifierShouldBeUnique() {
        const responseBody = JSON.parse(this.response.body);
        assert.notEqual(responseBody.pathwayId, undefined);
        assert.notEqual(responseBody.pathwayId, '');
    }

    @then('I should see two errors message from the platform during the initialization')
    public thenIShouldSeeAnErrorMessage() {
        const responseBody = JSON.parse(this.response.body);
        assert.notEqual(responseBody.message, undefined);
        assert.notEqual(responseBody.name, undefined);
        assert.strictEqual(responseBody.errors.length, 2);
        assert.strictEqual(responseBody.statusCode, HttpStatus.BAD_REQUEST);
    }
}

export = ControllerSteps;
