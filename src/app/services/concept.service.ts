import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {

    typeaheadActive: boolean;

    constructor(private http: HttpService) {
    }

    getTypeaheadConcepts(input) {
        let params = {
            termFilter: input,
            limit: 20,
            expand: 'fsn()',
            activeFilter: true
        };

        return this.http.getTypeaheadConcepts(params);
    }
}
