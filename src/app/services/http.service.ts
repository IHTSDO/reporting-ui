import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { Report } from '../models/report';
import { Query } from '../models/query';
import { TypeaheadConcepts } from '../models/typeaheadConcepts';
import { Template } from '../models/template';
import { Concept } from '../models/concept';

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

    // SCHEDULE-MANAGER ENDPOINTS
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

    getWhitelist(name) {
        return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/whitelist')
    }

    postWhitelist(name, params) {
        return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/whitelist', JSON.stringify(params), this.options);
    }

    // AUTHORING-SERVICES ENDPOINTS
    getTypeaheadConcepts(params): Observable<TypeaheadConcepts> {
        return this.http.post<TypeaheadConcepts>('/snowowl/snomed-ct/v2/MAIN/concepts/search', params, this.options);
    }

    // TEMPLATE-SERVICE ENDPOINTS
    getTemplateConcepts() {
        return this.http.get<Template[]>('/template-service/templates');
    }

    // AUTHORIZATION ENDPOINT
    getLoggedInUser() {
        return this.http.get('/auth');
    }

    // CONFIG ENDPOINT
    getUIConfig() {
        return this.http.get('/config/endpointConfig.json');
    }
}
