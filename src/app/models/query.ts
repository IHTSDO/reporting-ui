import { Concept } from './concept';

export class Query {
    name: string;
    description: string;
    productionStatus: string;
    tags: string[];
    parameters: object;
    whiteList: Concept[];
}
