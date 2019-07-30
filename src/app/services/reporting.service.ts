import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Report } from '../models/report';
import { Query } from '../models/query';
import { Concept } from '../models/concept';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    constructor(private http: HttpClient) {
    }

    // CATEGORIES ENDPOINTS
    getCategories() {
        return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    }

    // REPORT ENDPOINTS
    getReportRuns(name) {
        return this.http.get<Report[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    postReport(query) {
        const params = {
            jobName: query.name,
            parameters: query.parameters
        };

        return this.http.post<Query>('/schedule-manager/jobs/Report/' + params.jobName + '/runs', JSON.stringify(params));
    }

    deleteReport(params) {
        return this.http.delete('/schedule-manager/jobs/Report/' + params.jobName + '/runs/' + params.id);
    }

    // WHITELIST ENDPOINTS
    getWhitelist(name) {
        return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/whitelist');
    }

    postWhitelist(name, params) {
        return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/whitelist', JSON.stringify(params));
    }
}
