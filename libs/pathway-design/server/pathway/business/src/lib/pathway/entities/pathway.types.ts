import type { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import type { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';

export interface InitializePathwayParams {
    description: PathwayDescriptionValueObject;
    id: PathwayIdValueObject;
    researchField: PathwayResearchFieldValueObject;
    title: PathwayTitleValueObject;
}

export interface AddArticleParams {
    articleTitle: string;
    resourceUrl: string;
}
