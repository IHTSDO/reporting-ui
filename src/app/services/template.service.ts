import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) {
    }

    getTemplateConcepts(): Observable<Template[]> {
        return this.http.get<Template[]>('/template-service/templates');
    }
}
