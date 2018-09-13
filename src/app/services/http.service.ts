import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        this.http.get<Report[]>('http://local.ihtsdotools.org:8086/authoring-services/jobs/Report').subscribe(result => {
            this.reportingService.reports.next(result);
        });
    }
    getReportRuns(name) {
        this.http.get<JobRun[]>('http://local.ihtsdotools.org:8086/authoring-services/jobs/Report/' + name + '/runs').subscribe(result => {
            this.reportingService.reportRuns.next(result);
        });
    }
    runReport(job, name) {
        this.http.post<JobRun[]>('http://local.ihtsdotools.org:8086/authoring-services/jobs/Report/' + name + '/runs', job)
        .subscribe(result => {
            this.reportingService.reportRuns.next(result);
        });
    }
}
