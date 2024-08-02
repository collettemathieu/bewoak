export class PDSPBVOTitleValueObjects {
    constructor(private title: string) {
        if (this.isEmpty(title)) {
            throw new Error('Title is required');
        }
    }

    get value() {
        return this.title;
    }

    equals(title: PDSPBVOTitleValueObjects) {
        return this.title === title.value;
    }

    toString() {
        return this.title;
    }

    private isEmpty(title: string) {
        return title.length === 0;
    }
}
