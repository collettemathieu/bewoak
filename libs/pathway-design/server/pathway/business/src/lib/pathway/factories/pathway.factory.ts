import { randomUUID } from 'node:crypto';
import { PDSPBEPathwayEntity } from '../entities/pathway';
import { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';
import type { PathwayFactoryParams } from './pathway.factory.types';

export const pDSPBFPathwayFactory = ({
    description: descriptionValue,
    id: idValue,
    researchField: researchFieldValue,
    title: titleValue,
}: PathwayFactoryParams) => {
    const description = new PathwayDescriptionValueObject(descriptionValue);
    const pathway = new PDSPBEPathwayEntity();
    const researchField = new PathwayResearchFieldValueObject(researchFieldValue);
    const title = new PathwayTitleValueObject(titleValue);

    const uuid = idValue ?? randomUUID();
    const id = new PathwayIdValueObject(uuid);

    pathway.initialize({
        id,
        title,
        description,
        researchField,
    });

    return pathway;
};
