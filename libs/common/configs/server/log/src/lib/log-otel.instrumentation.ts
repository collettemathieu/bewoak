import { logs } from '@opentelemetry/api-logs';
import { ConsoleLogRecordExporter, LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

export const runLogOtelInstrumentation = () => {
    const loggerProvider = new LoggerProvider();

    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()));

    logs.setGlobalLoggerProvider(loggerProvider);
};
