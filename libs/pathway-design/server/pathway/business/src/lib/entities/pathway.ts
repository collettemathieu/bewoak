import { AggregateRoot } from '@nestjs/cqrs';
import { PDSPBEPathwayInitializedEvent } from '../events/pathway-initialized.event';
import { PDSPBEPathwayTitleChangedEvent } from '../events/pathway-title-changed.event';
import type { DescriptionValueObject } from '../value-objects/description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { ResearchFieldValueObjects } from '../value-objects/research-field.value-object';
import type { PDSPBVOTitleValueObjects } from '../value-objects/title.value-object';
import type { InitializePathwayParams } from './pathway.types';

export class PDSPBEPathwayEntity extends AggregateRoot {
    #description: DescriptionValueObject | undefined;
    #id: PathwayIdValueObject | undefined;
    #researchField: ResearchFieldValueObjects | undefined;
    #title: PDSPBVOTitleValueObjects | undefined;

    get description() {
        return this.#description?.value ?? '';
    }

    get id() {
        return this.#id?.value ?? '';
    }

    get researchField() {
        return this.#researchField?.value ?? '';
    }

    get title() {
        return this.#title?.value ?? '';
    }

    initialize({ id, title, description, researchField }: InitializePathwayParams) {
        this.#description = description;
        this.#id = id;
        this.#researchField = researchField;
        this.#title = title;

        this.apply(
            new PDSPBEPathwayInitializedEvent(this.id, {
                description: this.description,
                pathwayId: this.id,
                researchField: this.researchField,
                title: this.title,
            }),
            {
                skipHandler: true,
            }
        );
    }

    changeTitle(title: PDSPBVOTitleValueObjects) {
        this.#title = title;

        this.apply(
            new PDSPBEPathwayTitleChangedEvent(this.id, {
                pathwayId: this.id,
                title: title.value,
            }),
            {
                skipHandler: true,
            }
        );
    }
}
