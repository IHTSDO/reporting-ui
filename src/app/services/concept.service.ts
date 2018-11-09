import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { TypeaheadConcepts } from '../models/typeaheadConcepts';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {

    typeaheadActive: boolean = true;

    constructor(private http: HttpService) {
    }

    getTypeaheadConcepts(input, limit): Observable<TypeaheadConcepts> {
        let params = {
            termFilter: input,
            limit: 20,
            expand: 'fsn()',
            activeFilter: true
        };

        return input.length > limit ? this.http.getTypeaheadConcepts(params) : of({});
    }
}
