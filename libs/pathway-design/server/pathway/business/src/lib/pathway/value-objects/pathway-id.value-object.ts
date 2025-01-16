import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRPathwayIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayIdValueObject {
    constructor(private readonly id: string) {
        if (pDCPBRPathwayIdRules.isValid(id) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayIdRules.textError());
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
