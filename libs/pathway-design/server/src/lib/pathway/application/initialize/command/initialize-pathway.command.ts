export class InitializePathwayCommand {
    constructor(
        public readonly description: string,
        public readonly researchField: string,
        public readonly title: string
    ) {}
}
