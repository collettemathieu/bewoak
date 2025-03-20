import { SpanOtel } from '@bewoak/common-configs-server-otel';
import { CTSEException } from '@bewoak/common-http-exceptions-server';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HandleExceptionInterceptor implements NestInterceptor {
    @SpanOtel()
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof CTSEException) {
                    const response = context.switchToHttp().getResponse<Response>();

                    const { errors, message, name, statusCode } = data;

                    response.status(statusCode);

                    return {
                        errors,
                        message,
                        name,
                        statusCode,
                        timestamp: new Date().toISOString(),
                    };
                }
                return data;
            })
        );
    }
}
