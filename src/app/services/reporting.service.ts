import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Report } from '../models/report';
import { Query } from '../models/query';
import { Concept } from '../models/concept';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    constructor(private http: HttpClient) {
    }

    // CATEGORIES ENDPOINTS
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    }

    // REPORT ENDPOINTS
    getReportRuns(name): Observable<Report[]> {
        return this.http.get<Report[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    postReport(query): Observable<Query> {
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
    getWhitelist(name): Observable<Concept[]> {
        return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/whitelist');
    }

    postWhitelist(name, codesystemsShortName, params): Observable<Concept[]> {
        return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codesystemsShortName +
            '/whitelist', JSON.stringify(params));
    }
}
