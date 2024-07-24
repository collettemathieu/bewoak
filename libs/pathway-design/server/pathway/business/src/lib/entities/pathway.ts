import type { DescriptionValueObject } from '../value-objects/description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { ResearchFieldValueObjects } from '../value-objects/research-field.value-object';
import type { TitleValueObjects } from '../value-objects/title.value-object';
import type { PathwayInitParams } from './pathway.types';

export class PDSPBEPathwayEntity {
    #description: DescriptionValueObject | undefined;
    #id: PathwayIdValueObject | undefined;
    #researchField: ResearchFieldValueObjects | undefined;
    #title: TitleValueObjects | undefined;

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

    init({ id, title, description, researchField }: PathwayInitParams) {
        this.#description = description;
        this.#id = id;
        this.#researchField = researchField;
        this.#title = title;
    }

    changeTitle(title: TitleValueObjects) {
        this.#title = title;
    }

    equals({
        description,
        researchField,
        title,
    }: {
        description: string;
        researchField: string;
        title: string;
    }) {
        return (
            this.#description?.value === description &&
            this.#researchField?.value === researchField &&
            this.#title?.value === title
        );
    }
}
