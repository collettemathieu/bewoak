import type { ResourceUrlValueObject } from '../../resource/value-objects/resource-url.value-object';
import type { ArticleTitleValueObject } from '../value-objects/article-title.value-object';

export interface InitializeArticleParams {
    title: ArticleTitleValueObject;
    url: ResourceUrlValueObject;
}
