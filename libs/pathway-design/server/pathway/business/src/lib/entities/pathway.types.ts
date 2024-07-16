import type { DescriptionValueObject } from '../value-objects/description';
import type { ResearchFieldValueObjects } from '../value-objects/research-field';
import type { TitleValueObjects } from '../value-objects/title';

export interface PathwayInitParams {
    description: DescriptionValueObject;
    researchField: ResearchFieldValueObjects;
    title: TitleValueObjects;
}
