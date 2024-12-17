import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCBPRResearchFieldRules } from '@bewoak/pathway-design-common-business-pathway-rules';

export class ResearchFieldValueObjects {
    constructor(private readonly researchField: string) {
        if (pDCBPRResearchFieldRules.isValid(researchField) === false) {
            throw new CTSEBadRequestException(pDCBPRResearchFieldRules.textError());
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
}
