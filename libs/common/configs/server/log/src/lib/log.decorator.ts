import { Logger } from '@nestjs/common';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function ErrLog() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const logger = new Logger(`${target.constructor.name}.${propertyKey}`);
        descriptor.value = function (...args: any[]) {
            try {
                logger.debug(`Arguments: ${args.join(', ')}`);
                const result = originalMethod.apply(this, args);
                return result;
            } catch (error: any) {
                console.log('ICI');
                logger.error(`Error: ${error}`);
            }
        };
    };
}
