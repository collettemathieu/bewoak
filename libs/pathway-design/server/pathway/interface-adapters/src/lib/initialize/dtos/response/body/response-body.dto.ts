import type { PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class InitializedPathwayResponseBodyDto implements PDSPBPPathwayPresenters {
    description!: string;
    id!: string;
    researchField!: string;
    title!: string;
}
