import { Module } from '@nestjs/common';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <To be explained>
export class AppModule {
    static register() {
        return {
            module: AppModule,
            imports: [],
        };
    }
}
