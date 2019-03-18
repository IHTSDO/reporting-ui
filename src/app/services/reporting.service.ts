import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    constructor(private http: HttpService) {
    }

    getCategories() {
        return this.http.getCategories();
    }

    getReportSet(name) {
        return this.http.getReportSet(name);
    }

    postReport(query) {
        const params = {
            jobName: query.name,
            parameters: query.parameters
        };

        return this.http.postReport(params);
    }

    postDeleteReport(report) {
        return this.http.postDeleteReport(report);
    }
}
