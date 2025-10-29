export class PathwayInMemoryEntity {
    constructor(
        public description: string,
        public pathwayId: string,
        public researchField: string,
        public title: string,
        public id?: string
    ) {}
}
