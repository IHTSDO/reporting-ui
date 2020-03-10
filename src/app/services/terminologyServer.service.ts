import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthoringService } from './authoring.service';
import { map } from 'rxjs/operators';
import { ProjectService } from './project.service';
import { Project } from '../models/project';

@Injectable({
    providedIn: 'root'
})
export class TerminologyServerService {

    activeProject: Project;
    private activeProjectSubscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService,
                private projectService: ProjectService) {
        this.activeProjectSubscription = this.projectService.getActiveProject().subscribe(data => this.activeProject = data);
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
            .post(this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint
                + this.activeProject.branchPath + '/concepts/search', params)
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

        if (this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
            delete params.termActive;
        }

        return this.http.post<object>(this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint
            + this.activeProject.branchPath + '/concepts/search', params);
    }
}
