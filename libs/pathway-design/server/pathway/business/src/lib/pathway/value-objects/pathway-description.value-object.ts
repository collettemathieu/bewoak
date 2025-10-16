import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failure, type Result, success } from '@bewoak/common-types-result';
import { pDCPBRPathwayDescriptionRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayDescriptionValueObject {
    private constructor(private readonly description: string) {}

    static create(description: string): Result<PathwayDescriptionValueObject, CTSEBadRequestException> {
        if (!pDCPBRPathwayDescriptionRules.isValid(description)) {
            return failure(new CTSEBadRequestException(pDCPBRPathwayDescriptionRules.textError()));
        }
        return success(new PathwayDescriptionValueObject(description));
    }

    get value() {
        return this.description;
    }

    equals(description: PathwayDescriptionValueObject) {
        return this.description === description.value;
    }

    toString() {
        return this.description;
    }
}
