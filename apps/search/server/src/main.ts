import { cCSECheckEnvironmentVariables, cCSEGetEnvironmentVariables } from '@bewoak/common-configs-server-env';
import { cCSSSetupSwaggerDocument } from '@bewoak/common-configs-server-swagger';
import { runOtelInstrumentation, ServerLogger } from '@bewoak/common-o11y-server';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envSchema } from './environment/env.schema';

async function bootstrap() {
    runOtelInstrumentation('AppsSearchServer');

    cCSECheckEnvironmentVariables(envSchema);

    const env = cCSEGetEnvironmentVariables(envSchema);
    const port = env.PORT;
    const globalPrefix = env.GLOBAL_PREFIX;
    const persistenceDriver = env.PERSISTENCE_DRIVER;

    const app = await NestFactory.create(AppModule.register({ persistenceDriver }), {
        bufferLogs: true,
        logger: new ServerLogger('AppsSearchServer', '1.0.0'),
    });
    app.setGlobalPrefix(globalPrefix);

    cCSSSetupSwaggerDocument(app, {
        description: 'API for Search',
        hasBearerAuth: true,
        path: 'api',
        title: 'Search API',
        version: '1.0',
    });

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
