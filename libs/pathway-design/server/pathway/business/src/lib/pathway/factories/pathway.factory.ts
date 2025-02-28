import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { type Result, failure, failureValueList, success, successValueList } from '@bewoak/common-types-result';
import { uuidv7 } from 'uuidv7';
import { PDSPBEPathwayEntity } from '../entities/pathway';
import { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';
import type { PathwayFactoryParams } from './pathway.factory.types';

export const pDSPBFPathwayFactory = ({
    description: descriptionValue,
    pathwayId: pathwayIdValue,
    researchField: researchFieldValue,
    title: titleValue,
}: PathwayFactoryParams): Result<PDSPBEPathwayEntity, CTSEBadRequestException> => {
    const descriptionResult = PathwayDescriptionValueObject.create(descriptionValue);
    const researchFieldResult = PathwayResearchFieldValueObject.create(researchFieldValue);
    const titleResult = PathwayTitleValueObject.create(titleValue);

    const uuid = pathwayIdValue ?? uuidv7();
    const pathwayIdResult = PathwayIdValueObject.create(uuid);

    const failures = failureValueList([pathwayIdResult, descriptionResult, researchFieldResult, titleResult]);

    if (haveErrors(failures)) {
        return failure(
            new CTSEBadRequestException(
                'Invalid pathway data',
                failures.map((failure) => ({
                    message: failure.message,
                }))
            )
        );
    }

    const [description, pathwayId, researchField, title] = successValueList([
        descriptionResult,
        pathwayIdResult,
        researchFieldResult,
        titleResult,
    ]);

    const pathway = new PDSPBEPathwayEntity();

    pathway.initialize({
        pathwayId,
        title,
        description,
        researchField,
    });

    return success(pathway);
};

export const haveErrors = (errors: CTSEBadRequestException[]) => errors.length > 0;
