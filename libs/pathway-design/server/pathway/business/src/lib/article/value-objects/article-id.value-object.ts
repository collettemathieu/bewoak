import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { pDCPBRArticleIdRules } from '@bewoak/pathway-design-common-pathway';

export class ArticleIdValueObject {
    constructor(private readonly articleId: string) {
        if (pDCPBRArticleIdRules.isValid(articleId) === false) {
            throw new CTSEBadRequestException(pDCPBRArticleIdRules.textError());
        }
    }
    get value() {
        return this.articleId;
    }

    equals(pathwayIdValueObject: ArticleIdValueObject): boolean {
        return this.articleId === pathwayIdValueObject.value;
    }

    toString() {
        return this.articleId.toString();
    }
}
