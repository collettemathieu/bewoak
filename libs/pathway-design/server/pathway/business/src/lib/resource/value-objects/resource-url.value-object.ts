import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRResourceUrlRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class ResourceUrlValueObject {
    constructor(private readonly url: string) {
        if (pDCPBRResourceUrlRules.isValid(url) === false) {
            throw new CTSEBadRequestException(pDCPBRResourceUrlRules.textError());
        }
    }

    get value() {
        return this.url;
    }

    equals(url: ResourceUrlValueObject) {
        return this.url === url.value;
    }

    toString() {
        return this.url;
    }
}
