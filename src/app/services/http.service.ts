import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from '../models/report';
import { JobRun } from '../models/jobRun';
import { Job } from '../models/job';
import { TypeaheadConcept } from '../models/typeaheadConcept';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    options: object;

    constructor(private http: HttpClient) {
        this.createHeaders();
    }

    createHeaders(): void {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.options = {headers: headers};
    }

    getReports() {
        return this.http.get<Report[]>('/schedule-manager/jobs/Report/');
    }

    getReportRuns(name) {
        return this.http.get<JobRun[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    postReportRun(job) {
        return this.http.post<Job>('/schedule-manager/jobs/Report/' + job.jobName + '/runs', JSON.stringify(job), this.options);
    }

    getTypeaheadConcepts(params) {
        return this.http.post<TypeaheadConcept>('/snowowl/snomed-ct/v2/MAIN/concepts/search', params, this.options);
    }
}
