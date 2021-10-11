import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import { AuthoringService } from '../authoring/authoring.service';
import { map } from 'rxjs/operators';
import {PathingService} from '../pathing/pathing.service';

@Injectable({
    providedIn: 'root'
})
export class TerminologyServerService {

    activeProject: any;
    private activeProjectSubscription;
    uiConfiguration: any;
    uiConfigurationSubscription: Subscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService,
                private pathingService: PathingService) {
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.uiConfigurationSubscription = this.authoringService.getUIConfiguration().subscribe( data => this.uiConfiguration = data);
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
            .post(this.uiConfiguration.endpoints.terminologyServerEndpoint
                + this.activeProject.key + '/concepts/search', params)
            .pipe(map(responseData => {
                const typeaheads = [];

                responseData['items'].forEach((item) => {
                    typeaheads.push(item.id + ' |' + item.fsn.term + '|');
                });

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

        if (this.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
            delete params.termActive;
        }

        return this.http.post<object>(this.uiConfiguration.endpoints.terminologyServerEndpoint
            + this.activeProject.key + '/concepts/search', params);
    }
}
