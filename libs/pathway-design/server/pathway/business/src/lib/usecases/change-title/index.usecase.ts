import type { PathwayDesignServerPathwayBusinessEntitiesPathway } from '../../entities/pathway';
import { TitleValueObjects } from '../../value-objects/title';

export class PathwayDesignServerPathwayBusinessUsecasesChangeNamePathway {
    execute({
        pathway,
        title,
    }: {
        pathway: PathwayDesignServerPathwayBusinessEntitiesPathway;
        title: string;
    }) {
        const newTitle = new TitleValueObjects(title);
        pathway.changeTitle(newTitle);
    }
}
