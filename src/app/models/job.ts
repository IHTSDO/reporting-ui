import {JobRun} from './jobRun';

export class Job {
    name: string;
    description: string;
    parameterNames: string[];
    jobRuns: JobRun[] 
}
