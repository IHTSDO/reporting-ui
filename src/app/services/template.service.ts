import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpService) {
    }

    getTemplateConcepts() {
        return this.http.getTemplateConcepts();
    }
}
