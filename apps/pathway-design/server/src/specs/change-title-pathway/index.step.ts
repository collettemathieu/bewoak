import { strict as assert } from 'node:assert';
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

        this.app = testingModule.createNestApplication(new FastifyAdapter());
        await this.app.init();
    }

    @given('I have a pathway on the platform with these data')
    public async givenIHaveAPathwayRecordedInMemroy(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await this.app.inject({
            method: 'POST',
            url: '/pathway/initialize',
            headers: { 'Content-Type': 'application/json' },
            payload: {
                title: firstRow.title,
                description: firstRow.description,
                researchField: firstRow.researchField,
            },
        });
    }

    @when('I want to change the title of the pathway on the platform {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        const responseBody = JSON.parse(this.response.body);

        this.response = await this.app.inject({
            method: 'PATCH',
            url: `/pathway/change-title/${responseBody.pathwayId}`,
            headers: { 'Content-Type': 'application/json' },
            payload: {
                title,
            },
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
