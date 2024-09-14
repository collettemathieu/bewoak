import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import { PDSPIPPathwayPersistenceInfrastructureModule } from '@bewoak/pathway-design-server-pathway-infrastructure';
import {
    PDSPIAChangeTitlePathwayInterfaceAdaptersModule,
    PDSPIAInitializePathwayInterfaceAdaptersModule,
} from '@bewoak/pathway-design-server-pathway-interface-adapters';
import { PDSPPPathwayPresentersModule } from '@bewoak/pathway-design-server-pathway-presenters';
import type { DataTable } from '@cucumber/cucumber';
import type { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import request from 'supertest';

@binding()
class ControllerSteps {
    private app: INestApplication;
    private httpServer: Http2Server;
    private response: request.Response;

    @given('I am authenticated on the platform for change the title of the pathway in memory persistence and json presenter')
    public async withInMemoryPeristenceAndJsonPresenter() {
        const testingModule = await Test.createTestingModule({
            imports: [
                PDSPIAChangeTitlePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use('inMemory'))
                    .build(),
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use('inMemory'))
                    .build(),
                CqrsModule.forRoot(),
            ],
        }).compile();

        this.app = testingModule.createNestApplication();
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
    }

    @given('I have a pathway recorded in memory with these data')
    public async givenIHaveAPathwayRecordedInMemroy(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await request(this.httpServer).post('/pathway/init').send({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });
    }

    @when('I want to change the title of the pathway in memory to {string}')
    public async whenIChangeTheTitleOfThePathwayTo(title: string) {
        this.response = await request(this.httpServer).patch(`/pathway/change-title/${this.response.body.id}`).send({
            title,
        });
    }

    @then('I should receive from memory the new title of the pathway')
    public async thenIShouldReceiveTheNewTitleOfThePathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        assert.strictEqual(this.response.body.title, firstRow.title);
    }
}

export = ControllerSteps;
