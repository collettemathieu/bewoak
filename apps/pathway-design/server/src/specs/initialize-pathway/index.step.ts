import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import { CCEPPathwayInitializedEvent } from '@bewoak/common-contracts-events-pathway';
import {
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-infrastructure';
import { PDSPIAInitializePathwayInterfaceAdaptersModule } from '@bewoak/pathway-design-server-pathway-interface-adapters';
import {
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-presenters';
import type { DataTable } from '@cucumber/cucumber';
import type { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import sinon from 'sinon';
import request from 'supertest';

@binding()
class ControllerSteps {
    private app: INestApplication;
    private eventEmitter: EventEmitter2;
    private eventEmitterSpy: sinon.SinonSpy | undefined;
    private httpServer: Http2Server;
    private response: request.Response;

    @given('I am authenticated on the platform for initialize a pathway with {string} and {string}')
    public async connectToServer(presenter: PDSPPPresenterDriverAuthorized, persistence: PDSPIPPersistenceDriverAuthorized) {
        const testingModule = await Test.createTestingModule({
            imports: [
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use(presenter))
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use(persistence))
                    .build(),
                CqrsModule.forRoot(),
                EventEmitterModule.forRoot({
                    wildcard: false,
                    delimiter: '.',
                    newListener: false,
                    removeListener: false,
                    maxListeners: 10,
                    verboseMemoryLeak: true,
                    ignoreErrors: false,
                }),
            ],
            exports: [],
        }).compile();

        this.app = testingModule.createNestApplication();
        await this.app.init();

        this.eventEmitter = this.app.get(EventEmitter2);
        this.eventEmitterSpy = sinon.spy(this.eventEmitter, 'emit');

        this.httpServer = this.app.getHttpServer();
    }

    @when('I want to initialize on the platform a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await request(this.httpServer).post('/pathway/init').send({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });
    }

    @then('The platform should send an event to the event bus with the pathway initialized')
    public thenPlatformSendAnEventToEventBus() {
        const expectedEvent = new CCEPPathwayInitializedEvent(
            this.response.body.description,
            this.response.body.id,
            this.response.body.researchField,
            this.response.body.title
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

        assert.strictEqual(this.response.body.title, firstRow.title);
        assert.strictEqual(this.response.body.description, firstRow.description);
        assert.strictEqual(this.response.body.researchField, firstRow.researchField);
    }

    @then('The pathway received from the platform should be have a unique identifier')
    public thenThePathwayIdentifierShouldBeUnique() {
        assert.notEqual(this.response.body.id, undefined);
        assert.notEqual(this.response.body.id, '');
    }
}

export = ControllerSteps;
