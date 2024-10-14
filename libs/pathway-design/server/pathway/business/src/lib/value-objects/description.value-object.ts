import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';

export class DescriptionValueObject {
    constructor(private readonly description: string) {
        if (this.isEmpty(description)) {
            throw new CTSEBadRequestException('Description is required');
        }
    }
    get value() {
        return this.description;
    }

    equals(description: DescriptionValueObject) {
        return this.description === description.value;
    }

    toString() {
        return this.description;
    }

    private isEmpty(name: string | undefined) {
        return name === undefined || name.length === 0;
    }
}
