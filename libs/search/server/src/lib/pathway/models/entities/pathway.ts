import { CTSEBadRequestException } from '@bewoak/common-http-exceptions-server';
import { failure, type Result, success } from '@bewoak/common-types-result';
import { PATHWAY_ERROR_MESSAGES } from './pathway.constants';
import type { PathwayEntityProps } from './pathway.types';

export class PathwayEntity {
    private constructor(
        public readonly createdAt: Date,
        public readonly description: string,
        public readonly pathwayId: string,
        public readonly researchField: string,
        public readonly title: string,
        public readonly updatedAt: Date
    ) {}

    static create({
        createdAt,
        description,
        pathwayId,
        researchField,
        title,
        updatedAt,
    }: PathwayEntityProps): Result<PathwayEntity, CTSEBadRequestException> {
        if (createdAt === undefined || createdAt === null) {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.CREATED_AT_REQUIRED));
        }

        if (description === undefined || description === null || description.trim() === '') {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.DESCRIPTION_REQUIRED));
        }

        if (researchField === undefined || researchField === null || researchField.trim() === '') {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.RESEARCH_FIELD_REQUIRED));
        }

        if (pathwayId === undefined || pathwayId === null || pathwayId.trim() === '') {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.PATHWAY_ID_REQUIRED));
        }

        if (title === undefined || title === null || title.trim() === '') {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.TITLE_REQUIRED));
        }

        if (updatedAt === undefined || updatedAt === null) {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.UPDATED_AT_REQUIRED));
        }

        if (createdAt > updatedAt) {
            return failure(new CTSEBadRequestException(PATHWAY_ERROR_MESSAGES.CREATED_AT_CANNOT_BE_LATER_THAN_UPDATED_AT));
        }

        return success(new PathwayEntity(createdAt, description, pathwayId, researchField, title, updatedAt));
    }
}
