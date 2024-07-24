import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InitializePathwayRequestBodyDto {
    @ApiProperty({ description: 'The title of the news' })
    @IsString()
    readonly title!: string;

    @ApiProperty({ description: 'The description of the news' })
    @IsString()
    readonly description!: string;

    @ApiProperty({ description: 'The research field of the news' })
    @IsString()
    readonly researchField!: string;
}
