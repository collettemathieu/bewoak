import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { cCSEGetEnvironmentVariables } from '@bewoak/common-configs-server-env';
import { runLogOtelInstrumentation, runOtelInstrumentation } from '@bewoak/common-configs-server-otel';
import { cCSSSetupSwaggerDocument } from '@bewoak/common-configs-server-swagger';
import { LogHttpExceptionFilter } from '@bewoak/common-http-exceptions-server';
import { HandleExceptionInterceptor } from '@bewoak/common-interceptors-server';
import { ServerLogger } from '@bewoak/common-log-server';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { envSchema } from './environment/env.schema';

async function bootstrap() {
    runLogOtelInstrumentation();
    runOtelInstrumentation('PathwayDesignServer');

    const env = cCSEGetEnvironmentVariables(envSchema);

    const persistenceDriver = env.PERSISTENCE_DRIVER;
    const presenterDriver = env.PRESENTER_DRIVER;
    const port = env.PORT;
    const globalPrefix = env.GLOBAL_PREFIX;

    const app = await NestFactory.create(
        AppModule.register({
            persistenceDriver,
            presenterDriver,
        }),
        new FastifyAdapter(),
        {
            bufferLogs: true,
            logger: new ServerLogger('PathwayDesignServer', '1.0.0'),
        }
    );
    app.setGlobalPrefix(globalPrefix);

    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new LogHttpExceptionFilter(httpAdapter));

    app.useGlobalInterceptors(new HandleExceptionInterceptor());

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
