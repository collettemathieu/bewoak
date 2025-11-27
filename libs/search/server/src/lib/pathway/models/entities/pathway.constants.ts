export const PATHWAY_ERROR_MESSAGES = {
    CREATED_AT_CANNOT_BE_LATER_THAN_UPDATED_AT:
        'Search Pathway Entity: createdAt field cannot have a date later than updatedAt field',
    CREATED_AT_REQUIRED: 'Search Pathway Entity: createdAt field is required and cannot be null or undefined',
    DESCRIPTION_REQUIRED: 'Search Pathway Entity: description field is required and cannot be null, undefined, or empty',
    PATHWAY_ID_REQUIRED: 'Search Pathway Entity: pathwayId field is required and cannot be null, undefined, or empty',
    RESEARCH_FIELD_REQUIRED: 'Search Pathway Entity: researchField field is required and cannot be null, undefined, or empty',
    TITLE_REQUIRED: 'Search Pathway Entity: title field is required and cannot be null, undefined, or empty',
    UPDATED_AT_REQUIRED: 'Search Pathway Entity: updatedAt field is required and cannot be null or undefined',
} as const;
