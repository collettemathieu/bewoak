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
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.INFO,
            severityText: 'INFO',
        });
    }

    fatal(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.FATAL,
            severityText: 'FATAL',
        });
    }

    error(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.ERROR,
            severityText: 'ERROR',
        });
    }

    warn(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.WARN,
            severityText: 'WARN',
        });
    }

    debug(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.DEBUG,
            severityText: 'DEBUG',
        });
    }

    verbose(message: string, ...optionalParams: OptionalParams[]) {
        this.#logger.emit({
            attributes: attributes(...optionalParams),
            body: message,
            severityNumber: SeverityNumber.TRACE,
            severityText: 'TRACE',
        });
    }
}
