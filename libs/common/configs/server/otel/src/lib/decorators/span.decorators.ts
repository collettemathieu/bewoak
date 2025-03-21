import { context, trace } from '@opentelemetry/api';

export const SpanOtel = () => {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const tracer = trace.getTracer('span-otel-tracer');

        const originalMethod = descriptor.value;

        descriptor.value = function (...args: unknown[]) {
            const contextActive = context.active();
            const span = tracer.startSpan(
                `${target.constructor.name}.${propertyKey.toString()}`,
                {
                    attributes: getAttributes(args),
                },
                contextActive
            );

            const boundMethod = originalMethod.bind(this);
            const contextWithSpan = trace.setSpan(contextActive, span);

            const result = context.with(contextWithSpan, () => boundMethod(...args));

            span.end();
            return result;
        };

        return descriptor;
    };
};

export const getAttributes = (args: unknown[]) =>
    args.reduce<Record<string, string | number | boolean>>((acc, arg, index) => {
        if (typeof arg === 'object') {
            return { ...arg };
        }

        if (typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean') {
            acc[`arg-${index}`] = arg;
            return acc;
        }

        acc[`arg-${index}`] = JSON.stringify(arg);
        return acc;
    }, {});
