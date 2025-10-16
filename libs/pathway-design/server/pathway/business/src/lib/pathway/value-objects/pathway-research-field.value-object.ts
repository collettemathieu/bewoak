import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failure, type Result, success } from '@bewoak/common-types-result';
import { pDCPBRPathwayResearchFieldRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayResearchFieldValueObject {
    private constructor(private readonly researchField: string) {}

    static create(researchField: string): Result<PathwayResearchFieldValueObject, CTSEBadRequestException> {
        if (!pDCPBRPathwayResearchFieldRules.isValid(researchField)) {
            return failure(new CTSEBadRequestException(pDCPBRPathwayResearchFieldRules.textError()));
        }
        return success(new PathwayResearchFieldValueObject(researchField));
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
