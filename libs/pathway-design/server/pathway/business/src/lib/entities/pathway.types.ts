import type { DescriptionValueObject } from '../value-objects/description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { ResearchFieldValueObjects } from '../value-objects/research-field.value-object';
import type { TitleValueObjects } from '../value-objects/title.value-object';

export interface PathwayInitParams {
    description: DescriptionValueObject;
    id: PathwayIdValueObject;
    researchField: ResearchFieldValueObjects;
    title: TitleValueObjects;
}
