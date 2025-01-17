import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRArticleTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class ArticleTitleValueObject {
    constructor(private readonly title: string) {
        if (pDCPBRArticleTitleRules.isValid(title) === false) {
            throw new CTSEBadRequestException(pDCPBRArticleTitleRules.textError());
        }
    }

    get value() {
        return this.title;
    }

    equals(title: ArticleTitleValueObject) {
        return this.title === title.value;
    }

    toString() {
        return this.title;
    }
}
