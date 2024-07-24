export class ResearchFieldValueObjects {
    constructor(private researchField: string) {
        if (this.isEmpty(researchField)) {
            throw new Error('Research field is required');
        }
    }
    get value() {
        return this.researchField;
    }

    equals(researchField: ResearchFieldValueObjects) {
        return this.researchField === researchField.value;
    }

    toString() {
        return this.researchField;
    }

    private isEmpty(name: string) {
        return name.length === 0;
    }
}
