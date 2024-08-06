import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import { PDSPIInitializePathwayPersistenceInfrastructureModule } from '@bewoak/pathway-design-server-pathway-infrastructure';
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
    private response: request.Response;
    private httpServer: Http2Server;

    @given('I am authenticated on the platform')
    public async givenAmIAuthenticatedOnThePlatform() {
        const module = await Test.createTestingModule({
            imports: [
                PDSPIAInitializePathwayInterfaceAdaptersModule.withPersistence(
                    PDSPIInitializePathwayPersistenceInfrastructureModule.use(
                        'inMemory'
                    )
                )
                    .withPresenter(PDSPPPathwayPresentersModule.use('toJson'))
                    .build(),
                CqrsModule.forRoot(),
            ],
        }).compile();

        this.app = module.createNestApplication();
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
    }

    @when('I want to initialize a pathway with these data')
    public async whenIInitiateAPathway(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        this.response = await request(this.httpServer)
            .post('/pathway/init')
            .send({
                title: firstRow.title,
                description: firstRow.description,
                researchField: firstRow.researchField,
            });
    }

    @then('I should retrieve a pathway initialized with its data')
    public thenIShouldRetrieveAPathwayInitiated(dataTable: DataTable) {
        const firstRow = dataTable.hashes()[0];

        assert.strictEqual(this.response.body.title, firstRow.title);
        assert.strictEqual(
            this.response.body.description,
            firstRow.description
        );
        assert.strictEqual(
            this.response.body.researchField,
            firstRow.researchField
        );
    }

    @then('The pathway should be have a unique identifier')
    public thenThePathwayIdentifierShouldBeUnique() {
        assert.notEqual(this.response.body.id, undefined);
        assert.notEqual(this.response.body.id, '');
    }
}

export = ControllerSteps;
