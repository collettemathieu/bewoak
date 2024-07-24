export class DescriptionValueObject {
    constructor(private description: string) {
        if (this.isEmpty(description)) {
            throw new Error('Description is required');
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

    private isEmpty(name: string) {
        return name.length === 0;
    }
}
