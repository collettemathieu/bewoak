import { IsString } from 'class-validator';

export class InitializePathwayRequestBodyDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsString()
    researchField!: string;
}
