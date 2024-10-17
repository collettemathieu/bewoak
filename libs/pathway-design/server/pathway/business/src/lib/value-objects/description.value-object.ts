import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCBPRDescriptionRules } from '@bewoak/pathway-design-common-business-pathway-rules';

export class DescriptionValueObject {
    constructor(private readonly description: string) {
        if (pDCBPRDescriptionRules.isValid(description) === false) {
            throw new CTSEBadRequestException(pDCBPRDescriptionRules.textError());
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
}
