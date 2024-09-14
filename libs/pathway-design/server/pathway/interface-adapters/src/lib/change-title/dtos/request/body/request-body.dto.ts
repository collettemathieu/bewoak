import { IsString } from 'class-validator';

export class ChangeTitlePathwayRequestBodyDto {
    @IsString()
    title!: string;
}
