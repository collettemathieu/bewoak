import { Logger } from '@nestjs/common';

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
