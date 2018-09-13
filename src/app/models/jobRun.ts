export class JobRun {
    id: string;
    jobName: string;
    parameters: [
      {
        key: string;
        value: string;
      }
    ];
    requestTime: string;
    user: string;
    status: string;
    issuesReported: string;
    result: string
}