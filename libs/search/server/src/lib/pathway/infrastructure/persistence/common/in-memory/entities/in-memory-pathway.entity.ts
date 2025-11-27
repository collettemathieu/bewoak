export class PathwayInMemoryEntity {
    constructor(
        public createdAt: Date,
        public description: string,
        public pathwayId: string,
        public researchField: string,
        public title: string,
        public updatedAt: Date,
        public id?: string
    ) {}
}
