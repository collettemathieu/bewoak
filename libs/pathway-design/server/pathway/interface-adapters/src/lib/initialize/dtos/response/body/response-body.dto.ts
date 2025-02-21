import type { PDSPBPPathwayPresenterError, PDSPBPPathwayPresenters } from '@bewoak/pathway-design-server-pathway-business';

export class InitializedPathwayResponseBodySuccessDto implements PDSPBPPathwayPresenters {
    description!: string;
    pathwayId!: string;
    researchField!: string;
    title!: string;
}

export class InitializedPathwayResponseBodyErrorDto implements PDSPBPPathwayPresenterError {
    message!: string;
}
