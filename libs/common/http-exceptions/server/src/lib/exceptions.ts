import { HttpStatus } from './types';

export abstract class CTSEException {
    public readonly errors?: Record<string, unknown>[] | undefined;
    public readonly message: string;
    public readonly name: string;
    public readonly statusCode: number;

    constructor(message: string, name: string, statusCode: number, errors?: Record<string, unknown>[]) {
        this.errors = errors;
        this.message = message;
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class CTSEBadRequestException extends CTSEException {
    constructor(message: string, errors?: Record<string, unknown>[]) {
        super(message, 'BadRequestException', HttpStatus.BAD_REQUEST, errors);
    }
}

export class CTSEInternalServerException extends CTSEException {
    constructor(message: string) {
        super(message, 'InternalServerException', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
