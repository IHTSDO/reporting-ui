import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthoringService } from './authoring.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TerminologyServerService {

    constructor(private http: HttpClient, private authoringService: AuthoringService) {
    }

    getTypeahead(term) {
        const params = {
            termFilter: term,
            limit: 20,
            expand: 'fsn()',
            activeFilter: true,
            termActive: true
        };
        return this.http
            .post(this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint +
            'MAIN/concepts/search', params)
            .pipe(map(responseData => {
                const typeaheads = [];

                if (responseData['items'].length > 0) {
                    responseData['items'].forEach((item) => {
                        typeaheads.push(item.id + ' |' + item.fsn.term + '|');
                    });
                } else {
                    return ['No results found'];
                }

                return typeaheads;
            }));
    }

    getConceptsById(idList): Observable<object> {

        const params = {
            conceptIds: idList,
            limit: 100,
            expand: 'fsn()',
            activeFilter: true,
            termActive: true
        };

        if (this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
            delete params.termActive;
        }

        return this.http.post<object>(this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint +
            'MAIN/concepts/search', params);
    }
}
