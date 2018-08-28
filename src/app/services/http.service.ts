import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../models/report';
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
}
