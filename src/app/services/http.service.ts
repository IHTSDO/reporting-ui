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
        this.http.get<Report[]>(`assets/fake-data/reports.json`).subscribe(result => {
            this.reportingService.reports.next(result);
        });
    }
}
