import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import { strict as assert } from 'node:assert';
import { ArticleEntity } from '../../../article/entities/article';
import { ArticleTitleValueObject } from '../../../article/value-objects/article-title.value-object';
import { ResourceUrlValueObject } from '../../../resource/value-objects/resource-url.value-object';
import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import { pDSPBFPathwayFactory } from '../../factories/pathway.factory';

@binding()
export default class PathwaySteps {
    private pDSPBEPathwayEntity: PDSPBEPathwayEntity | undefined;
    private error: Error | undefined;

    @given('I have initialized a pathway without article in business with these data')
    public givenIHaveInitializedAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.pDSPBEPathwayEntity = pDSPBFPathwayFactory({
            title: data.title,
            description: data.description,
            researchField: data.researchField,
        });
    }

    @when('I add an article to the pathway in business with these data')
    public thenIShouldRetrieveAttributesPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            titleOfArticle: string;
            urlOfResource: string;
        };

        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        try {
            const article = new ArticleEntity();
            article.initialize({
                title: new ArticleTitleValueObject(data.titleOfArticle),
                url: new ResourceUrlValueObject(data.urlOfResource),
            });
            this.pDSPBEPathwayEntity.addArticle(article);
        } catch (error) {
            this.error = error as Error;
        }
    }

    @then('I should retrieve the attributes of article of the pathway from business')
    public thenIShouldRetrieveArticleAttributesCreated(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            titleOfArticle: string;
            urlOfResource: string;
        };

        if (this.pDSPBEPathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        assert.equal(this.error, undefined);
        assert.equal(this.pDSPBEPathwayEntity.articleList.length, 1);
        assert.equal(this.pDSPBEPathwayEntity.articleList[0].title, data.titleOfArticle);
        assert.equal(this.pDSPBEPathwayEntity.articleList[0].resource?.url, data.urlOfResource);
    }
}
