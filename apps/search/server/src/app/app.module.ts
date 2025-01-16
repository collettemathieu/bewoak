import { Module } from '@nestjs/common';

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AppModule {
    static register() {
        return {
            module: AppModule,
            imports: [],
        };
    }
}
