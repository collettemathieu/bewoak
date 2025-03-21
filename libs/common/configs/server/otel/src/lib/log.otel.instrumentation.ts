import { logs } from '@opentelemetry/api-logs';
import { ConsoleLogRecordExporter, LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

export const runLogOtelInstrumentation = () => {
    const loggerProvider = new LoggerProvider();

    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()));

    // loggerProvider.addLogRecordProcessor(
    //     new SimpleLogRecordProcessor(
    //         new OTLPLogRecordExporter({
    //             url: 'http://otel-collector:4318/v1/logs', // ou l'URL correspondant à votre endpoint OTLP
    //         })
    //     )
    // );

    logs.setGlobalLoggerProvider(loggerProvider);
};
