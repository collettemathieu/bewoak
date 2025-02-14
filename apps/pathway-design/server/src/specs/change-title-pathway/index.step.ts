import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import {
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-infrastructure';
import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
} from '@bewoak/pathway-design-server-pathway-interface-adapters';
import {
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server-pathway-presenters';
import type { DataTable } from '@cucumber/cucumber';
import type { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import request from 'supertest';

@binding()
class ControllerSteps {
    private app: INestApplication;
    private httpServer: Http2Server;
    private response: request.Response;

    @given('I am authenticated on the platform for change the title of the pathway with {string} and {string}')
    public async connectToPlatform(presenter: PDSPPPresenterDriverAuthorized, persistence: PDSPIPPersistenceDriverAuthorized) {
        const persistenceModule = PDSPIPPathwayPersistenceInfrastructureModule.use(persistence);
        const presenterModule = PDSPPPathwayPresentersModule.use(presenter);

        const testingModule = await Test.createTestingModule({
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(presenterModule)
                    .withPersistence(persistenceModule)
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
        }).compile();

        this.app = testingModule.createNestApplication();
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
    }

    @given('I have a pathway on the platform with these data')
    public async givenIHaveAPathwayRecordedInMemroy(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await request(this.httpServer).post('/pathway/initialize').send({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });
    }

    @when('I want to change the title of the pathway on the platform {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        this.response = await request(this.httpServer).patch(`/pathway/change-title/${this.response.body.pathwayId}`).send({
            title,
        });
    }

    @then('I should receive from the platform the new title of the pathway')
    public async thenIShouldReceiveTheNewTitleOfThePathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        assert.strictEqual(this.response.body.title, firstRow.title);
    }
}

export = ControllerSteps;
