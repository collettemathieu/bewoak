import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCBPRPathwayIdRules } from '@bewoak/pathway-design-common-business-pathway-rules';

export class PathwayIdValueObject {
    constructor(private readonly id: string) {
        if (pDCBPRPathwayIdRules.isValid(id) === false) {
            throw new CTSEBadRequestException(pDCBPRPathwayIdRules.textError());
        }
    }
    get value() {
        return this.id;
    }

    equals(pathwayIdValueObject: PathwayIdValueObject): boolean {
        return this.id === pathwayIdValueObject.value;
    }

    toString() {
        return this.id.toString();
    }
}
