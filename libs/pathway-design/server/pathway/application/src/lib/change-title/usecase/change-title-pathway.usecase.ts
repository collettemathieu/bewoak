import {
    type PDSPBEPathwayEntity,
    PDSPBVOTitleValueObjects,
} from '@bewoak/pathway-design-server-pathway-business';

export class PDSPBUChangeTitlePathwayUseCase {
    execute({
        pathway,
        title,
    }: {
        pathway: PDSPBEPathwayEntity;
        title: string;
    }) {
        const newTitle = new PDSPBVOTitleValueObjects(title);
        pathway.changeTitle(newTitle);
    }
}
