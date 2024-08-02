import type { DescriptionValueObject } from '../value-objects/description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { ResearchFieldValueObjects } from '../value-objects/research-field.value-object';
import type { PDSPBVOTitleValueObjects } from '../value-objects/title.value-object';
import type { InitializePathwayParams } from './pathway.types';

export class PDSPBEPathwayEntity {
    #description: DescriptionValueObject | undefined;
    #id: PathwayIdValueObject | undefined;
    #researchField: ResearchFieldValueObjects | undefined;
    #title: PDSPBVOTitleValueObjects | undefined;

    get description() {
        return this.#description;
    }

    get id() {
        return this.#id;
    }

    get researchField() {
        return this.#researchField;
    }

    get title() {
        return this.#title;
    }

    init({ id, title, description, researchField }: InitializePathwayParams) {
        this.#description = description;
        this.#id = id;
        this.#researchField = researchField;
        this.#title = title;
    }

    changeTitle(title: PDSPBVOTitleValueObjects) {
        this.#title = title;
    }
}
