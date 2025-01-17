import { AggregateRoot } from '@nestjs/cqrs';
import type { ArticleEntity } from '../../article/entities/article';
import { PDSPBEPathwayInitializedEvent } from '../events/pathway-initialized.event';
import { PDSPBEPathwayTitleChangedEvent } from '../events/pathway-title-changed.event';
import type { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import type { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';
import type { InitializePathwayParams } from './pathway.types';

export class PDSPBEPathwayEntity extends AggregateRoot {
    #articleList: ArticleEntity[] = [];
    #description: PathwayDescriptionValueObject | undefined;
    #id: PathwayIdValueObject | undefined;
    #researchField: PathwayResearchFieldValueObject | undefined;
    #title: PathwayTitleValueObject | undefined;

    get articleList() {
        return this.#articleList;
    }

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

    changeTitle(title: PathwayTitleValueObject) {
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

    addArticle(article: ArticleEntity) {
        this.#articleList.push(article);
    }
}
