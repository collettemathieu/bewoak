import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class LogHttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const cause = exception instanceof HttpException || exception instanceof Error ? exception.cause : 'Error';
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception.message
                : exception instanceof Error
                  ? exception.message
                  : 'Internal Server Error';
        const name = exception instanceof HttpException || exception instanceof Error ? exception.name : 'Error';

        const responseBody = {
            cause,
            message,
            name,
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
        };

        const path = httpAdapter.getRequestUrl(ctx.getRequest());

        const logger = new Logger();
        logger.error(message, responseBody, path);

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
