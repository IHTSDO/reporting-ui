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

    postReport(query, codeSystemShortname, project): Observable<Query> {
        const params = {
            codeSystemShortname: codeSystemShortname,
            jobName: query.name,
            project: project,
            parameters: query.parameters
        };

        return this.http.post<Query>('/schedule-manager/jobs/Report/' + params.jobName + '/runs', JSON.stringify(params));
    }

    deleteReport(params) {
        return this.http.delete('/schedule-manager/jobs/Report/' + params.jobName + '/runs/' + params.id);
    }

    // WHITELIST ENDPOINTS
    getWhitelist(name, codeSystemShortName): Observable<Concept[]> {
        return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist');
    }

    postWhitelist(name, codeSystemShortName, params): Observable<Concept[]> {
        return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist',
            JSON.stringify(params));
    }
}
