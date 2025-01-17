import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRPathwayResearchFieldRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayResearchFieldValueObject {
    constructor(private readonly researchField: string) {
        if (pDCPBRPathwayResearchFieldRules.isValid(researchField) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayResearchFieldRules.textError());
        }
    }
    get value() {
        return this.researchField;
    }

    equals(researchField: PathwayResearchFieldValueObject) {
        return this.researchField === researchField.value;
    }

    toString() {
        return this.researchField;
    }
}
