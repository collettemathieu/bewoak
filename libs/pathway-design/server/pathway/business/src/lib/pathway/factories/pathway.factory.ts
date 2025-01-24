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
}: PathwayFactoryParams) => {
    const description = new PathwayDescriptionValueObject(descriptionValue);
    const pathway = new PDSPBEPathwayEntity();
    const researchField = new PathwayResearchFieldValueObject(researchFieldValue);
    const title = new PathwayTitleValueObject(titleValue);

    const uuid = pathwayIdValue ?? uuidv7();
    const pathwayId = new PathwayIdValueObject(uuid);

    pathway.initialize({
        pathwayId,
        title,
        description,
        researchField,
    });

    return pathway;
};
