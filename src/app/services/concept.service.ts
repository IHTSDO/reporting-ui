import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ConceptService {

    constructor(private http: HttpService) {
    }

    getTypeaheadConcepts(input) {
        return this.http.getTypeaheadConcepts(input);
    }
}
