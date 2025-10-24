import { strict as assert } from 'node:assert';
import { successValue } from '@bewoak/common-types-result';
import type { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import type { PathwayEntity } from '../../entities/pathway';
import { pathwayFactory } from '../../factories/pathway.factory';

@binding()
export default class PathwaySteps {
    private pathwayEntity: PathwayEntity | undefined;
    private error: Error | undefined;

    @given('I have initialized a pathway without article in business with these data')
    public givenIHaveInitializedAPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            title: string;
            description: string;
            researchField: string;
        };

        this.pathwayEntity = successValue(
            pathwayFactory({
                description: data.description,
                researchField: data.researchField,
                title: data.title,
            })
        );
    }

    @when('I add an article to the pathway in business with these data')
    public thenIShouldRetrieveAttributesPathway(dataTable: DataTable) {
        const data = dataTable.hashes()[0] as {
            titleOfArticle: string;
            urlOfResource: string;
        };

        if (this.pathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        try {
            this.pathwayEntity.addArticle({
                articleTitle: data.titleOfArticle,
                resourceUrl: data.urlOfResource,
            });
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

        if (this.pathwayEntity === undefined) {
            throw new Error('Pathway is not initialized');
        }

        assert.equal(this.error, undefined);
        assert.equal(this.pathwayEntity.articleList.length, 1);
        assert.equal(this.pathwayEntity.articleList[0].title, data.titleOfArticle);
        assert.equal(this.pathwayEntity.articleList[0].resource?.url, data.urlOfResource);
    }

    @then('I should see an error message from business during the article addition')
    public thenIShouldSeeAnErrorMessageDuringArticleAddition() {
        assert.notEqual(this.error, undefined);
        assert.notEqual(this.error?.message, undefined);
        assert.notEqual(this.error?.message, '');
    }
}
