import { Module } from '@nestjs/common';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <Not applicable>
export class AppModule {
    static register() {
        return {
            imports: [],
            module: AppModule,
        };
    }
}
