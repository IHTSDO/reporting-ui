import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AuthoringService} from '../authoring/authoring.service';
import {PathingService} from '../pathing/pathing.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    uiConfiguration: any;
    uiConfigurationSubscription: Subscription;
    activeBranch: any;
    activeBranchSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;
    activeTask: any;
    activeTaskSubscription: Subscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService,
                private pathingService: PathingService) {
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.activeTaskSubscription = this.pathingService.getActiveTask().subscribe(data => this.activeTask = data);
        this.uiConfigurationSubscription = this.authoringService.getUIConfiguration().subscribe(data => this.uiConfiguration = data);
    }

    getTypeahead(term): Observable<any> {
        return this.http.get(this.uiConfiguration.endpoints.terminologyServerEndpoint
            + (this.activeBranch ? this.activeBranch.branchPath : '')
            + (this.activeProject ? '/' + this.activeProject.key : '')
            + (this.activeTask ? '/' + this.activeTask.key : '')
            + '/concepts?termActive=true&limit=20&term=' + term)
            .pipe(map(response => {
                    const typeaheads = [];

                    response['items'].forEach((item) => {
                        typeaheads.push(item.id + ' |' + item.fsn.term + '|');
                    });

                    return typeaheads;
                }),
                catchError((e) => {
                    document.getElementById('spinner').remove();
                    throw e;
                }));
    }

    getConceptsById(idList): Observable<object> {
        const params = {
            conceptIds: idList,
            limit: 100,
            expand: 'fsn()',
            termActive: true
        };

        return this.http.post<object>(this.uiConfiguration.endpoints.terminologyServerEndpoint
            + (this.activeBranch ? this.activeBranch.branchPath : '')
            + (this.activeProject ? '/' + this.activeProject.key : '')
            + (this.activeTask ? '/' + this.activeTask.key : '')
            + '/concepts/search', params);
    }
}
