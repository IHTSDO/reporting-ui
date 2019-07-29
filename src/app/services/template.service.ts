import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) {
    }

    getTemplateConcepts() {
        return this.http.get<Template[]>('/template-service/templates');
    }
}
