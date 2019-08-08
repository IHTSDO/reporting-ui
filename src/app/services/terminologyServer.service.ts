import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthoringService } from './authoring.service';

@Injectable({
    providedIn: 'root'
})
export class TerminologyServerService {

    constructor(private http: HttpClient, private authoringService: AuthoringService) {
    }

    getTypeaheadConcepts(term): Observable<object> {
        if (!term.trim()) {
            return of({});
        }

        const params = {
            termFilter: term,
            limit: 20,
            expand: 'fsn()',
            activeFilter: true,
            termActive: true
        };

        if (this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
            delete params.termActive;
        }

        return this.http.post<object>( this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint +
            'MAIN/concepts/search', params);
    }
}
