import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleEntity } from '../../article/entities/article';
import { ArticleTitleValueObject } from '../../article/value-objects/article-title.value-object';
import { ResourceUrlValueObject } from '../../resource/value-objects/resource-url.value-object';
import { PDSPBEPathwayInitializedEvent } from '../events/pathway-initialized.event';
import { PDSPBEPathwayTitleChangedEvent } from '../events/pathway-title-changed.event';
import type { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import type { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import type { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import type { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';
import type { AddArticleParams, InitializePathwayParams } from './pathway.types';

export class PDSPBEPathwayEntity extends AggregateRoot {
    #articleList: ArticleEntity[] = [];
    #description: PathwayDescriptionValueObject | undefined;
    #pathwayId: PathwayIdValueObject | undefined;
    #researchField: PathwayResearchFieldValueObject | undefined;
    #title: PathwayTitleValueObject | undefined;

    get articleList() {
        return this.#articleList;
    }

    get description() {
        return this.#description?.value ?? '';
    }

    get pathwayId() {
        return this.#pathwayId?.value ?? '';
    }

    get researchField() {
        return this.#researchField?.value ?? '';
    }

    get title() {
        return this.#title?.value ?? '';
    }

    initialize({ pathwayId, title, description, researchField }: InitializePathwayParams) {
        this.#description = description;
        this.#pathwayId = pathwayId;
        this.#researchField = researchField;
        this.#title = title;

        this.apply(
            new PDSPBEPathwayInitializedEvent(this.pathwayId, {
                description: this.description,
                pathwayId: this.pathwayId,
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
            new PDSPBEPathwayTitleChangedEvent(this.pathwayId, {
                pathwayId: this.pathwayId,
                title: title.value,
            }),
            {
                skipHandler: true,
            }
        );
    }

    addArticle({ articleTitle, resourceUrl }: AddArticleParams) {
        const article = new ArticleEntity();
        article.initialize({
            title: new ArticleTitleValueObject(articleTitle),
            url: new ResourceUrlValueObject(resourceUrl),
        });
        this.#articleList.push(article);
    }
}
