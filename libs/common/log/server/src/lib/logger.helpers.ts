import type { AnyValueMap } from '@opentelemetry/api-logs';

export const attributes = (...optionalParams: ({ [attributeKey: string]: string | number | boolean } | string)[]) =>
    optionalParams.reduce((acc, param) => {
        if (typeof param === 'string') {
            // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
            return { ...acc, [`attr-${param}`]: param };
        }

        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return { ...acc, ...param };
    }, {} as AnyValueMap);
