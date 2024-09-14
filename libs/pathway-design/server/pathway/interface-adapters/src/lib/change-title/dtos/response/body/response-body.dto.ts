import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class ChangeTitlePathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    id!: string;
    researchField!: string;
    title!: string;
}
