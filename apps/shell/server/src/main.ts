import { cCSEGetEnvironmentVariables } from '@bewoak/common-configs-server-env';
import { LogHttpExceptionFilter } from '@bewoak/common-http-exceptions-server';
import { HandleExceptionInterceptor } from '@bewoak/common-interceptors-server';
import { runOtelInstrumentation, ServerLogger } from '@bewoak/common-o11y-server';
import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { envSchema } from './environment/env.schema';

async function bootstrap() {
    runOtelInstrumentation('AppsShellServer');

    const env = cCSEGetEnvironmentVariables(envSchema);

    const persistenceDriverPathwayDesignServer = env.PERSISTENCE_DRIVER_PATHWAY_DESIGN_SERVER;
    const presenterDriverPathwayDesignServer = env.PRESENTER_DRIVER_PATHWAY_DESIGN_SERVER;
    const persistenceDriverSearchServer = env.PERSISTENCE_DRIVER_SEARCH_SERVER;
    const port = env.PORT;
    const globalPrefix = env.GLOBAL_PREFIX;

    const app = await NestFactory.create(
        AppModule.register({
            persistenceDriverPathwayDesignServer,
            persistenceDriverSearchServer,
            presenterDriverPathwayDesignServer,
        }),
        new FastifyAdapter(),
        {
            bufferLogs: true,
            logger: new ServerLogger('AppsShellServer', '1.0.0'),
        }
    );
    app.setGlobalPrefix(globalPrefix);

    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new LogHttpExceptionFilter(httpAdapter));

    app.useGlobalInterceptors(new HandleExceptionInterceptor());

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
