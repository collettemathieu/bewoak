import { CTSEException } from '@bewoak/common-http-exceptions-server';
import { TraceSpan } from '@bewoak/common-o11y-server';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class HandleExceptionInterceptor implements NestInterceptor {
    @TraceSpan()
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map((data: unknown) => {
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
