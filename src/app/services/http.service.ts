import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from '../models/report';
import { JobRun } from '../models/jobRun';
import { ReportingService } from './reporting.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private reportingService: ReportingService) {
    }

    getReports() {
        this.http.get<Report[]>('/schedule-manager/jobs/Report').subscribe(result => {
            this.reportingService.reports.next(result);
        });
    }
    getReportRuns(name) {
        this.http.get<JobRun[]>('/schedule-manager/jobs/Report/' + name + '/runs').subscribe(result => {
            this.reportingService.reportRuns.next(result);
        });
    }
    postReportRun(job, activeReport) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers: headers };

        return this.http.post('/schedule-manager/jobs/Report/' + job.jobName + '/runs', JSON.stringify(job), options).subscribe(result => {
            this.getReportRuns(activeReport);
        });
    }

    getReportRunsNew(name) {
        return this.http.get<JobRun[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    getTypeaheadConcepts(input) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers: headers };

        let params = {
            termFilter: input,
            limit: 20,
            expand: 'fsn()'
        };

        return this.http.post('/snowowl/snomed-ct/v2/MAIN/concepts/search', params, options);
    }
}
