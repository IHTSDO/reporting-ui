import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Report } from '../models/report';
import { JobRun } from '../models/jobRun';
import { HttpService } from './http.service';


@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    
    public reports = new Subject<Report[]>();
    public reportRuns = new Subject<JobRun[]>();

    getReports(): Observable<Report[]> {
        return this.reports.asObservable();
    }
    getReportRuns(name): Observable<JobRun[]> {
        return this.reportRuns.asObservable();
    }
}
