import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';

export class PathwayIdValueObject {
    constructor(private id: string) {
        if (!this.isUuid(id)) {
            throw new CTSEBadRequestException('Pathway id must be a valid uuid');
        }
    }
    get value() {
        return this.id;
    }

    equals(pathwayIdValueObject: PathwayIdValueObject): boolean {
        return this.id === pathwayIdValueObject.value;
    }

    toString() {
        return this.id.toString();
    }

    private isUuid(id: string) {
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        return uuidV4Regex.test(id);
    }
}
