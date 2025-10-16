import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failure, type Result, success } from '@bewoak/common-types-result';
import { pDCPBRPathwayTitleRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayTitleValueObject {
    private constructor(private readonly title: string) {}

    static create(title: string): Result<PathwayTitleValueObject, CTSEBadRequestException> {
        if (!pDCPBRPathwayTitleRules.isValid(title)) {
            return failure(new CTSEBadRequestException(pDCPBRPathwayTitleRules.textError()));
        }
        return success(new PathwayTitleValueObject(title));
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
