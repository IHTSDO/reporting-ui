import { Concept } from './concept';

export class Query {
    name: string;
    description: string;
    productionStatus: string;
    parameters: object;
    whiteList: Concept[];
    // parameterNames: string[];
    // parameterSubmissions: string[];
}
