import { strict as assert } from 'node:assert';
import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
    PDSPIPPathwayPersistenceInfrastructureModule,
    type PDSPIPPersistenceDriverAuthorized,
    PDSPPPathwayPresentersModule,
    type PDSPPPresenterDriverAuthorized,
} from '@bewoak/pathway-design-server';
import type { DataTable } from '@cucumber/cucumber';
import { HttpStatus } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import type * as fastify from 'fastify';

@binding()
class ControllerSteps {
    private app: NestFastifyApplication;
    private response: fastify.LightMyRequestResponse;

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
    }

    @given('I have a pathway on the platform with these data')
    public async givenIHaveAPathwayRecordedInMemroy(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await this.app.inject({
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            payload: {
                description: firstRow.description,
                researchField: firstRow.researchField,
                title: firstRow.title,
            },
            url: '/pathway/initialize',
        });
    }

    @when('I want to change the title of the pathway on the platform {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        const responseBody = JSON.parse(this.response.body);

        this.response = await this.app.inject({
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            payload: {
                title,
            },
            url: `/pathway/change-title/${responseBody.pathwayId}`,
        });
    }

    @then('I should receive from the platform the new title of the pathway')
    public async thenIShouldReceiveTheNewTitleOfThePathway(dataTable: DataTable) {
        const responseBody = JSON.parse(this.response.body);
        const firstRow = dataTable.hashes()[0];

        assert.strictEqual(responseBody.title, firstRow.title);
    }

    @then('I should an error message from the platform during changing the title')
    public thenIShouldSeeAnErrorMessage() {
        const responseBody = JSON.parse(this.response.body);

        assert.notEqual(responseBody.message, undefined);
        assert.notEqual(responseBody.name, undefined);
        assert.strictEqual(responseBody.errors, undefined);
        assert.strictEqual(responseBody.statusCode, HttpStatus.BAD_REQUEST);
    }
}

export = ControllerSteps;
