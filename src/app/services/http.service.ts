import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../models/category';
import { Report } from '../models/report';
import { Query } from '../models/query';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    options: object;

    constructor(private http: HttpClient) {
        this.createHeaders();
    }

    createHeaders(): void {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.options = {headers: headers};
    }

    getCategories() {
        return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    }

    getReportSet(name) {
        return this.http.get<Report[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    postReport(params) {
        return this.http.post<Query>('/schedule-manager/jobs/Report/' + params.jobName + '/runs', JSON.stringify(params), this.options);
    }

    postDeleteReport(params) {
        return this.http.delete('/schedule-manager/jobs/Report/' + params.jobName + '/runs/' + params.id);
    }

    getTypeaheadConcepts(params) {
        return this.http.post('/snowowl/snomed-ct/v2/MAIN/concepts/search', params, this.options);
    }
}
