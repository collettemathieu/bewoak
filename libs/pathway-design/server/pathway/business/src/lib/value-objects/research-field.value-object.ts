import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';

export class ResearchFieldValueObjects {
    constructor(private readonly researchField: string) {
        if (this.isEmpty(researchField)) {
            throw new CTSEBadRequestException('Research field is required');
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

    private isEmpty(researchField: string | undefined) {
        return researchField === undefined || researchField.length === 0;
    }
}
