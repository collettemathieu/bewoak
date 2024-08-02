import { randomUUID } from 'node:crypto';
import { PDSPBEPathwayEntity } from '../entities/pathway';
import { DescriptionValueObject } from '../value-objects/description.value-object';
import { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import { ResearchFieldValueObjects } from '../value-objects/research-field.value-object';
import { PDSPBVOTitleValueObjects } from '../value-objects/title.value-object';
import type { PDSPBFPathwayFactoryParams } from './pathway.types';

export const pDSPBFPathwayFactory = ({
    description: descriptionValue,
    id: idValue,
    researchField: researchFieldValue,
    title: titleValue,
}: PDSPBFPathwayFactoryParams) => {
    const description = new DescriptionValueObject(descriptionValue);
    const pathway = new PDSPBEPathwayEntity();
    const researchField = new ResearchFieldValueObjects(researchFieldValue);
    const title = new PDSPBVOTitleValueObjects(titleValue);

    const uuid = idValue ?? randomUUID();
    const id = new PathwayIdValueObject(uuid);

    pathway.init({
        id,
        title,
        description,
        researchField,
    });

    return pathway;
};
