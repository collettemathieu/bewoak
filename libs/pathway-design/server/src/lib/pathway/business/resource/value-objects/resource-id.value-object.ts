import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { pDCPBRResourceIdRules } from '@bewoak/pathway-design-common-pathway';

export class ResourceIdValueObject {
    constructor(private readonly resourceId: string) {
        if (pDCPBRResourceIdRules.isValid(resourceId) === false) {
            throw new CTSEBadRequestException(pDCPBRResourceIdRules.textError());
        }
    }
    get value() {
        return this.resourceId;
    }

    equals(pathwayIdValueObject: ResourceIdValueObject): boolean {
        return this.resourceId === pathwayIdValueObject.value;
    }

    toString() {
        return this.resourceId.toString();
    }
}
