import { strict as assert } from 'node:assert';
import type { Http2Server } from 'node:http2';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { binding, given, then, when } from 'cucumber-tsflow';
import request from 'supertest';
import { AppModule } from '../app/app.module';

@binding()
class ControllerSteps {
    private app: INestApplication;
    private response: request.Response;
    private httpServer: Http2Server;

    @given("l'application NestJS est lancée")
    public async givenApplicationIsRunning() {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        this.app = moduleFixture.createNestApplication();
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
    }

    @when("j'effectue une requête GET sur {string}")
    public async whenIMakeAGetRequest(url: string) {
        this.response = await request(this.httpServer).get(url);
    }

    @then('la réponse doit avoir un statut {int}')
    public thenTheResponseStatusShouldBe(status: number) {
        assert.equal(this.response.status, status);
    }

    @then('la réponse doit contenir {string}')
    public thenTheResponseShouldContain(content: string) {
        assert.ok(this.response.text.includes(content));
    }
}

export = ControllerSteps;
