import { HttpStatus } from './types';

export abstract class CTSEException {
    public readonly message: string;
    public readonly name: string;
    public readonly statusCode: number;

    constructor(message: string, name: string, statusCode: number) {
        this.message = message;
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class CTSEBadRequestException extends CTSEException {
    constructor(message: string) {
        super(message, 'BadRequestException', HttpStatus.BAD_REQUEST);
    }
}

export class CTSEInternalServerException extends CTSEException {
    constructor(message: string) {
        super(message, 'InternalServerErrorException', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
