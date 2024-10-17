import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCBPRTitleRules } from '@bewoak/pathway-design-common-business-pathway-rules';

export class PDSPBVOTitleValueObjects {
    constructor(private readonly title: string) {
        if (pDCBPRTitleRules.isValid(title) === false) {
            throw new CTSEBadRequestException(pDCBPRTitleRules.textError());
        }
    }

    get value() {
        return this.title;
    }

    equals(title: PDSPBVOTitleValueObjects) {
        return this.title === title.value;
    }

    toString() {
        return this.title;
    }
}
