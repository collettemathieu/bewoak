import { SSPAAddPathwayApplicationModule } from '@bewoak/search-server';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <Not applicable>
export class AppModule {
    static register() {
        return {
            imports: [
                SSPAAddPathwayApplicationModule,
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
            module: AppModule,
        };
    }
}
