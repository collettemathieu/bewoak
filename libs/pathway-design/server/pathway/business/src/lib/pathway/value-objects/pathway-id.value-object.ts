import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { type Result, failure, success } from '@bewoak/common-types-result';
import { pDCPBRPathwayIdRules } from '@bewoak/pathway-design-common-pathway-business-rules';

export class PathwayIdValueObject {
    private constructor(private readonly pathwayId: string) {}

    static create(pathwayId: string): Result<PathwayIdValueObject, CTSEBadRequestException> {
        if (!pDCPBRPathwayIdRules.isValid(pathwayId)) {
            return failure(new CTSEBadRequestException(pDCPBRPathwayIdRules.textError()));
        }
        return success(new PathwayIdValueObject(pathwayId));
    }

    get value() {
        return this.pathwayId;
    }

    equals(pathwayIdValueObject: PathwayIdValueObject): boolean {
        return this.pathwayId === pathwayIdValueObject.value;
    }

    toString() {
        return this.pathwayId.toString();
    }
}
