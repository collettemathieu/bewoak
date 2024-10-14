import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { PDCBPR_titleRules } from '@bewoak/pathway-design-common-business-pathway-rules';

export class PDSPBVOTitleValueObjects {
    constructor(private readonly title: string) {
        if (PDCBPR_titleRules.isValid(title) === false) {
            throw new CTSEBadRequestException('Title is required');
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
