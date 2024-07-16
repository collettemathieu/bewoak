import { PathwayDesignServerPathwayBusinessEntitiesPathway } from '../entities/pathway';
import { DescriptionValueObject } from '../value-objects/description';
import { ResearchFieldValueObjects } from '../value-objects/research-field';
import { TitleValueObjects } from '../value-objects/title';
import type { PathwayInitDto } from './pathway.dto';

export const pathwayFactory = ({
    title: titleValue,
    description: descriptionValue,
    researchField: researchFieldValue,
}: PathwayInitDto) => {
    const pathway = new PathwayDesignServerPathwayBusinessEntitiesPathway();
    const title = new TitleValueObjects(titleValue);
    const description = new DescriptionValueObject(descriptionValue);
    const researchField = new ResearchFieldValueObjects(researchFieldValue);

    pathway.init({
        title,
        description,
        researchField,
    });

    return pathway;
};
