export class DescriptionValueObject {
    constructor(private description: string) {
        if (this.isEmpty(description)) {
            throw new Error('Description is required');
        }
    }
    get value(): string {
        return this.description;
    }

    equals(description: DescriptionValueObject): boolean {
        return this.description === description.value;
    }

    toString(): string {
        return this.description;
    }

    private isEmpty(name: string): boolean {
        return name.length === 0;
    }
}
