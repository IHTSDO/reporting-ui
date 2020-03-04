export class Project {
    key: string;
    branchPath: string;
    title: string;
    metadata: {
        codeSystemShortName: string;
    };

    constructor(key, title) {
        this.key = key;
        this.title = title;
    }
}
