import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import { PDSPIPPathwayPersistenceInfrastructureModule } from '@bewoak/pathway-design-server-pathway-infrastructure';
import { PDSPIAInitializePathwayInterfaceAdaptersModule } from '@bewoak/pathway-design-server-pathway-interface-adapters';
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

    @given('I am authenticated on the platform for initialize a pathway in memory persistence and json presenter')
    public async withInMemoryPeristenceAndJsonPresenter() {
        const testingModule = await Test.createTestingModule({
            imports: [
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
                    .withPersistence(PDSPIPPathwayPersistenceInfrastructureModule.use('inMemory'))
                    .build(),
                CqrsModule.forRoot(),
            ],
            exports: [],
        }).compile();

        this.app = testingModule.createNestApplication();
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
    }

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await request(this.httpServer).post('/pathway/init').send({
            title: firstRow.title,
            description: firstRow.description,
            researchField: firstRow.researchField,
        });
    }

    @then('I should retrieve a pathway initialized with its data')
    public thenIShouldRetrieveAPathwayInitiated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        assert.strictEqual(this.response.body.title, firstRow.title);
        assert.strictEqual(this.response.body.description, firstRow.description);
        assert.strictEqual(this.response.body.researchField, firstRow.researchField);
    }

    @then('The pathway should be have a unique identifier')
    public thenThePathwayIdentifierShouldBeUnique() {
        assert.notEqual(this.response.body.id, undefined);
        assert.notEqual(this.response.body.id, '');
    }
}

export = ControllerSteps;
