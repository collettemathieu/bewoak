export class ResearchFieldValueObjects {
    constructor(private researchField: string) {
        if (this.isEmpty(researchField)) {
            throw new Error('Research field is required');
        }
    }
    get value(): string {
        return this.researchField;
    }

    equals(researchField: ResearchFieldValueObjects): boolean {
        return this.researchField === researchField.value;
    }

    toString(): string {
        return this.researchField;
    }

    private isEmpty(name: string): boolean {
        return name.length === 0;
    }
}
