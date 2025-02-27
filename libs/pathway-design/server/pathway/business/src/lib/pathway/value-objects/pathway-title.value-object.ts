import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayTitleValueObject {
    constructor(private readonly title: string) {
        if (pDCPBRPathwayTitleRules.isValid(title) === false) {
            throw new CTSEBadRequestException(pDCPBRPathwayTitleRules.textError());
        }
    }

    get value() {
        return this.title;
    }

    equals(title: PathwayTitleValueObject) {
        return this.title === title.value;
    }

    toString() {
        return this.title;
    }
}
