import { IsString } from 'class-validator';

export class ChangeTitlePathwayRequestParamsDto {
    @IsString()
    pathwayId!: string;
}
