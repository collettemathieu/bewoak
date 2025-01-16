// import type { Http2Server } from 'node:http2';
// import type { INestApplication } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { binding, given, then, when } from 'cucumber-tsflow';
// import type request from 'supertest';

// @binding()
// class ControllerSteps {
//     private app: INestApplication;
//     private httpServer: Http2Server;
//     private response: request.Response;

//     @given('i have access to the search platform')
//     public async connectToSearchPlatform() {
//         const testingModule = await Test.createTestingModule({
//             imports: [],
//         }).compile();

//         this.app = testingModule.createNestApplication();
//         await this.app.init();
//         this.httpServer = this.app.getHttpServer();
//     }

//     @when('i search for all learning pathways')
//     public async searchAllPublishedPathways() {}

//     @then('i should see all learning pathways published on the search platform')
//     public async shouldSeeAllPublishedPathways() {}

//     @when('i search for a subset of learning pathways')
//     public async searchSubsetPublishedPathways() {}

//     @then('i should see a subset of learning pathways published on the search platform')
//     public async shouldSeeSubsetPublishedPathways() {}
// }

// export = ControllerSteps;
