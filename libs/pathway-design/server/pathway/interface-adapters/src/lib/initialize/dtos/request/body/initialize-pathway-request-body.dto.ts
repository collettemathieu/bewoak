import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InitializePathwayRequestBodyDto {
    @ApiProperty({ description: 'The title of the pathway' })
    @IsString()
    readonly title!: string;

    @ApiProperty({ description: 'The description of the pathway' })
    @IsString()
    readonly description!: string;

    @ApiProperty({ description: 'The research field of the pathway' })
    @IsString()
    readonly researchField!: string;
}
