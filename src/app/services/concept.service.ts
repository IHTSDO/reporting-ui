import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { TypeaheadConcepts } from '../models/typeaheadConcepts';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {

    constructor(private http: HttpService) {
    }

    getTypeaheadConcepts(term, activeFilter): Observable<TypeaheadConcepts> {
        if(!term.trim()) {
            return of(new TypeaheadConcepts());
        }

        let params = {
            termFilter: term,
            limit: 20,
            expand: 'fsn()',
            activeFilter: activeFilter
        };

        return this.http.getTypeaheadConcepts(params);
    }
}
