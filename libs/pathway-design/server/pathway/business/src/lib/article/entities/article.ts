import { uuidv7 } from 'uuidv7';
import { ResourceEntity } from '../../resource/entities/resource';
import { ArticleIdValueObject } from '../value-objects/article-id.value-object';
import type { ArticleTitleValueObject } from '../value-objects/article-title.value-object';
import type { InitializeArticleParams } from './article.types';

export class ArticleEntity {
    #title: ArticleTitleValueObject | undefined;
    #articleId: ArticleIdValueObject | undefined;
    #resource: ResourceEntity | undefined;

    get title() {
        return this.#title?.value ?? '';
    }

    get articleId() {
        return this.#articleId?.value ?? '';
    }

    get resource() {
        return this.#resource;
    }

    initialize({ title, url }: InitializeArticleParams) {
        this.#articleId = new ArticleIdValueObject(uuidv7());
        this.#title = title;

        const resource = new ResourceEntity();
        resource.initialize({ url });
        this.#resource = resource;
    }
}
