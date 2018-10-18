import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeaheadConcept } from '../models/typeaheadConcept';
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

    postReport(job) {
        return this.http.post<Query>('/schedule-manager/jobs/Report/' + job.jobName + '/runs', JSON.stringify(job), this.options);
    }

    getTypeaheadConcepts(params) {
        return this.http.post('/snowowl/snomed-ct/v2/MAIN/concepts/search', params, this.options);
    }
}
