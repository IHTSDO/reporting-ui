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

        return this.http.postReport(params);
    }

    postReport(query, inputs) {
        // let parameters = {};
        //
        // if (!query.parameterNames) {
        //     parameters = null;
        // }
        // else {
        //     for (let i = 0; i < query.parameterNames.length; i++) {
        //         parameters[query.parameterNames[i]] = inputs[i];
        //     }
        // }
        //
        // let params = {
        //     jobName: query.name,
        //     parameters: parameters
        // };

        let params = {
            jobName: query.name,
            parameters: {}
        };

        if(!query.parameterNames) {
            params.parameters = null
        }
        else {
            for (let i = 0; i < query.parameterNames.length; i++) {
                params.parameters[query.parameterNames[i]] = inputs[i];
            }
        }

        return this.http.postReport(params);
    }
}
