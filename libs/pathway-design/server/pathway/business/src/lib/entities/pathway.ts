import type { DescriptionValueObject } from '../value-objects/description';
import type { ResearchFieldValueObjects } from '../value-objects/research-field';
import type { TitleValueObjects } from '../value-objects/title';
import type { PathwayInitParams } from './pathway.types';

export class PathwayDesignServerPathwayBusinessEntitiesPathway {
    description: DescriptionValueObject | undefined;
    researchField: ResearchFieldValueObjects | undefined;
    title: TitleValueObjects | undefined;

    init({ title, description, researchField }: PathwayInitParams) {
        this.title = title;
        this.description = description;
        this.researchField = researchField;
    }

    changeTitle(title: TitleValueObjects) {
        this.title = title;
    }
}
