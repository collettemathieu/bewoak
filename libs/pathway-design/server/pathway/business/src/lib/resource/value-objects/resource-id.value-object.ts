import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRResourceIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class ResourceIdValueObject {
    constructor(private readonly id: string) {
        if (pDCPBRResourceIdRules.isValid(id) === false) {
            throw new CTSEBadRequestException(pDCPBRResourceIdRules.textError());
        }
    }
    get value() {
        return this.id;
    }

    equals(pathwayIdValueObject: ResourceIdValueObject): boolean {
        return this.id === pathwayIdValueObject.value;
    }

    toString() {
        return this.id.toString();
    }
}
