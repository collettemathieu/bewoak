import { CTSEException } from '@bewoak/common-http-exceptions-server';
import { Logger } from '@nestjs/common';

export function ErrorLog() {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: unknown[]) {
            const result = await originalMethod.apply(this, args);

            if (result.value instanceof CTSEException) {
                const logger = new Logger();
                logger.error(
                    result.value.message,
                    result.value,
                    { constructor: target.constructor.name },
                    { method: propertyKey },
                    { errors: { ...result.value.errors } }
                );
            }

            if (result instanceof CTSEException) {
                const logger = new Logger();
                logger.error(
                    result.message,
                    result,
                    { constructor: target.constructor.name },
                    { method: propertyKey },
                    { errors: { ...result.errors } }
                );
            }

            return result;
        };
    };
}

export function Log(message: string) {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: unknown[]) {
            const result = await originalMethod.apply(this, args);

            const logger = new Logger();

            logger.log(message, result, { constructor: target.constructor.name }, { method: propertyKey });

            return result;
        };
    };
}
