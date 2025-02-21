import { Injectable, type LoggerService } from '@nestjs/common';
import { SeverityNumber, logs } from '@opentelemetry/api-logs';

@Injectable()
export class ServerLogger implements LoggerService {
    #logger = logs.getLogger('example', '1.0.0');

    log(message: string, ...optionalParams: ({ [attributeKey: string]: string | number | boolean } | string)[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.INFO,
            severityText: 'INFO',
            body: message,
            attributes: { optionalParams },
        });
    }

    fatal(message: string, ...optionalParams: any[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.FATAL,
            severityText: 'FATAL',
            body: message,
            attributes: { optionalParams },
        });
    }

    error(message: string, ...optionalParams: ({ [attributeKey: string]: string | number | boolean } | string)[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.ERROR,
            severityText: 'ERROR',
            body: message,
            attributes: { optionalParams },
        });
    }

    warn(message: string, ...optionalParams: any[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.WARN,
            severityText: 'WARN',
            body: message,
            attributes: { optionalParams },
        });
    }

    debug(message: string, ...optionalParams: any[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.DEBUG,
            severityText: 'DEBUG',
            body: message,
            attributes: { optionalParams },
        });
    }

    verbose(message: string, ...optionalParams: any[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.TRACE,
            severityText: 'TRACE',
            body: message,
            attributes: { optionalParams },
        });
    }
}
