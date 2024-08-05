export class InitializePathwayRequestBodyDto
    implements IInitializePathwayRequestBodyDto
{
    readonly title!: string;

    readonly description!: string;

    readonly researchField!: string;
}

export interface IInitializePathwayRequestBodyDto {
    description: string;
    researchField: string;
    title: string;
}
