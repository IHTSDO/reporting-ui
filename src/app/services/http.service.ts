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
        this.http.get<Report[]>('http://local.ihtsdotools.org:8086/schedule-manager/jobs/Report').subscribe(result => {
            this.reportingService.reports.next(result);
        });
    }
    getReportRuns(name) {
        this.http.get<JobRun[]>('http://local.ihtsdotools.org:8086/schedule-manager/jobs/Report/' + name + '/runs').subscribe(result => {
            this.reportingService.reportRuns.next(result);
        });
    }
    postReportRun(job) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers: headers };

        return this.http.post('http://local.ihtsdotools.org:8086/schedule-manager/jobs/Report/' + job.jobName + '/runs', JSON.stringify(job), options).subscribe(result => {
            console.log('POST: ', result);
        });
    }
}
