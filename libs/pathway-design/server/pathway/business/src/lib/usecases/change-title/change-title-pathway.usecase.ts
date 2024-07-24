import type { PDSPBEPathwayEntity } from '../../entities/pathway';
import { TitleValueObjects } from '../../value-objects/title.value-object';

export class PDSPBUChangeTitlePathwayUseCase {
    execute({
        pathway,
        title,
    }: {
        pathway: PDSPBEPathwayEntity;
        title: string;
    }) {
        const newTitle = new TitleValueObjects(title);
        pathway.changeTitle(newTitle);
    }
}
