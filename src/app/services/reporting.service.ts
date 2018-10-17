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

    postReportRun(name, parameters) {
        let params = {
            jobName: name,
            parameters: parameters
        };

        return this.http.postReportRun(params);
    }
}
