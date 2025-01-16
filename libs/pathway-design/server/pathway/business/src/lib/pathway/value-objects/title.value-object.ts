import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PDSPBVOTitleValueObjects {
    constructor(private readonly title: string) {
        if (pDCPBRPathwayTitleRules.isValid(title) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayTitleRules.textError());
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
