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
        let params = {
            jobName: query.name,
            parameters: query.parameters
        };

        // if(!query.parameterNames) {
        //     params.parameters = null
        // }
        // else {
        //     for (let i = 0; i < query.parameterNames.length; i++) {
        //         params.parameters[query.parameterNames[i]] = inputs[i];
        //     }
        // }

        return this.http.postReport(params);
    }

    postDeleteReport(report) {
        return this.http.postDeleteReport(report);
    }
}
