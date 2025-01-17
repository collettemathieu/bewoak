import { CTSEBadRequestException } from '@bewoak/common-tools-server-http-exceptions';
import { pDCPBRArticleIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class ArticleIdValueObject {
    constructor(private readonly id: string) {
        if (pDCPBRArticleIdRules.isValid(id) === false) {
            throw new CTSEBadRequestException(pDCPBRArticleIdRules.textError());
        }
    }
    get value() {
        return this.id;
    }

    equals(pathwayIdValueObject: ArticleIdValueObject): boolean {
        return this.id === pathwayIdValueObject.value;
    }

    toString() {
        return this.id.toString();
    }
}
