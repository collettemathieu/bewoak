import { HttpStatus } from './types';

export class CTSEBadRequestException extends Error {
    public readonly statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = HttpStatus.BAD_REQUEST;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
