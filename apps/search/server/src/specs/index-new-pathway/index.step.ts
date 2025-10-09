// import type { Http2Server } from 'node:http2';
// import type { INestApplication } from '@nestjs/common';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { Test } from '@nestjs/testing';
// import { binding, given, then, when } from 'cucumber-tsflow';
// import type request from 'supertest';

// @binding()
// class ControllerSteps {
//     private app: INestApplication;
//     private httpServer: Http2Server;
//     private response: request.Response;

//     @given('a new learning pathway has been published')
//     public async newPathwayPublished() {
//         const testingModule = await Test.createTestingModule({
//             imports: [
//                 EventEmitterModule.forRoot({
//                     wildcard: false,
//                     delimiter: '.',
//                     newListener: false,
//                     removeListener: false,
//                     maxListeners: 10,
//                     verboseMemoryLeak: true,
//                     ignoreErrors: false,
//                 }),
//             ],
//         }).compile();

//         this.app = testingModule.createNestApplication(new FastifyAdapter());
//         await this.app.init();
//         this.httpServer = this.app.getHttpServer();
//     }

//     @when('the search platform indexes the new learning pathway')
//     public async platformIndexesNewPathway() {}

//     @then('the new learning pathway should be searchable')
//     public async newPathwayIsSearchable() {}
// }

// export = ControllerSteps;
