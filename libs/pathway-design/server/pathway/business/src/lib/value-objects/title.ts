export class TitleValueObjects {
    constructor(private title: string) {
        if (this.isEmpty(title)) {
            throw new Error('Title is required');
        }
    }

    get value(): string {
        return this.title;
    }

    equals(title: TitleValueObjects): boolean {
        return this.title === title.value;
    }

    toString(): string {
        return this.title;
    }

    private isEmpty(title: string): boolean {
        return title.length === 0;
    }
}
