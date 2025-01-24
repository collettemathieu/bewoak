import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class InitializedPathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    pathwayId!: string;
    researchField!: string;
    title!: string;
}
