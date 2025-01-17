import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRPathwayDescriptionRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayDescriptionValueObject {
    constructor(private readonly description: string) {
        if (pDCPBRPathwayDescriptionRules.isValid(description) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayDescriptionRules.textError());
        }
    }
    get value() {
        return this.description;
    }

    equals(description: PathwayDescriptionValueObject) {
        return this.description === description.value;
    }

    toString() {
        return this.description;
    }
}
