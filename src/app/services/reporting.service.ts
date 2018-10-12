import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    constructor(private http: HttpService) {
    }

    getReports() {
        return this.http.getReports();
    }

    getReportRuns(name) {
        return this.http.getReportRuns(name);
    }

    postReportRun(name, parameters) {
        let params = {
            jobName: name,
            parameters: parameters
        };

        this.http.postReportRun(params);
    }
}
