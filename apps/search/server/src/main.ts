import { cCSECheckEnvironmentVariables, cCSEGetEnvironmentVariables } from '@bewoak/common-configs-server-env';
import { cCSSSetupSwaggerDocument } from '@bewoak/common-configs-server-swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envSchema } from './environment/env.schema';

async function bootstrap() {
    cCSECheckEnvironmentVariables(envSchema);

    const env = cCSEGetEnvironmentVariables(envSchema);
    const port = env.PORT;
    const globalPrefix = env.GLOBAL_PREFIX;

    const app = await NestFactory.create(AppModule.register(), {
        bufferLogs: true,
    });
    app.setGlobalPrefix(globalPrefix);

    cCSSSetupSwaggerDocument(app, {
        description: 'API for Pathway Design',
        hasBearerAuth: true,
        path: 'api',
        title: 'Pathway Design API',
        version: '1.0',
    });

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
