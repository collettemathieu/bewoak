import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failure, failureValueList, isFailure, success, successValue, successValueList } from '@bewoak/common-types-result';
import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleEntity } from '../../article/entities/article';
import { ArticleTitleValueObject } from '../../article/value-objects/article-title.value-object';
import { ResourceUrlValueObject } from '../../resource/value-objects/resource-url.value-object';
import { PDSPBEPathwayInitializedEvent } from '../events/pathway-initialized.event';
import { PDSPBEPathwayTitleChangedEvent } from '../events/pathway-title-changed.event';
import { PathwayDescriptionValueObject } from '../value-objects/pathway-description.value-object';
import { PathwayIdValueObject } from '../value-objects/pathway-id.value-object';
import { PathwayResearchFieldValueObject } from '../value-objects/pathway-research-field.value-object';
import { PathwayTitleValueObject } from '../value-objects/pathway-title.value-object';
import { PDSPBE_INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE } from './pathway.constants';
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

    initialize({ description, pathwayId, researchField, title }: InitializePathwayParams) {
        const descriptionResult = PathwayDescriptionValueObject.create(description);
        const pathwayIdResult = PathwayIdValueObject.create(pathwayId);
        const researchFieldResult = PathwayResearchFieldValueObject.create(researchField);
        const titleResult = PathwayTitleValueObject.create(title);

        const failures = failureValueList([pathwayIdResult, descriptionResult, researchFieldResult, titleResult]);

        if (haveErrors(failures)) {
            return failure(
                new CTSEBadRequestException(
                    PDSPBE_INVALID_PATHWAY_DATA_INITIALIZATION_MESSAGE,
                    failures.map((failure) => ({
                        message: failure.message,
                    }))
                )
            );
        }

        const [description1, pathwayId1, researchField1, title1] = successValueList([
            descriptionResult,
            pathwayIdResult,
            researchFieldResult,
            titleResult,
        ]);

        this.#description = description1;
        this.#pathwayId = pathwayId1;
        this.#researchField = researchField1;
        this.#title = title1;

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

        return success(this);
    }

    changeTitle(title: string) {
        const titleResult = PathwayTitleValueObject.create(title);

        if (isFailure(titleResult)) {
            return titleResult;
        }

        this.#title = successValue(titleResult);

        this.apply(
            new PDSPBEPathwayTitleChangedEvent(this.pathwayId, {
                pathwayId: this.pathwayId,
                title: this.title,
            }),
            {
                skipHandler: true,
            }
        );

        return success(this);
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

export const haveErrors = (errors: CTSEBadRequestException[]) => errors.length > 0;
