export class PathwayEntity {
    constructor(
        public readonly description: string,
        public readonly pathwayId: string,
        public readonly researchField: string,
        public readonly title: string
    ) {}
}
