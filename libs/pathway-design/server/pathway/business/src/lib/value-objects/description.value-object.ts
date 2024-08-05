import { BadRequestException } from '../exceptions';

export class DescriptionValueObject {
    constructor(private description: string) {
        if (this.isEmpty(description)) {
            throw new BadRequestException('Description is required');
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
