import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { pDCPBRPathwayIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayIdValueObject {
    constructor(private readonly pathwayId: string) {
        if (pDCPBRPathwayIdRules.isValid(pathwayId) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayIdRules.textError());
        }
    }
    get value() {
        return this.pathwayId;
    }

    equals(pathwayIdValueObject: PathwayIdValueObject): boolean {
        return this.pathwayId === pathwayIdValueObject.value;
    }

    toString() {
        return this.pathwayId.toString();
    }
}
