import { Injectable, type LoggerService } from '@nestjs/common';
import { type Logger, logs, SeverityNumber } from '@opentelemetry/api-logs';
import { attributes } from './logger.helpers';
import type { OptionalParams } from './logger.types';

@Injectable()
export class ServerLogger implements LoggerService {
    #logger: Logger;

    constructor(name: string, version: string) {
        this.#logger = logs.getLogger(name, version);
    }

    log(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.INFO,
            severityText: 'INFO',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }

    fatal(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.FATAL,
            severityText: 'FATAL',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }

    error(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.ERROR,
            severityText: 'ERROR',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }

    warn(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.WARN,
            severityText: 'WARN',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }

    debug(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.DEBUG,
            severityText: 'DEBUG',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }

    verbose(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            severityNumber: SeverityNumber.TRACE,
            severityText: 'TRACE',
            body: message,
            attributes: attributes(...optionalParams),
        });
    }
}
