import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthoringService} from '../authoring/authoring.service';
import {PathingService} from '../pathing/pathing.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    uiConfiguration: any;
    uiConfigurationSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService,
                private pathingService: PathingService) {
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.uiConfigurationSubscription = this.authoringService.getUIConfiguration().subscribe( data => this.uiConfiguration = data);
    }

    getTypeahead(term): Observable<any> {
        return this.http.get(this.uiConfiguration.endpoints.terminologyServerEndpoint + (this.activeProject ? this.activeProject.key : 'MAIN') + '/concepts?activeFilter=true&termActive=true&limit=20&term=' + term)
            .pipe(map(response => {
                const typeaheads = [];

                response['items'].forEach((item) => {
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

        return this.http.post<object>(this.uiConfiguration.endpoints.terminologyServerEndpoint + (this.activeProject ? this.activeProject.key : 'MAIN') + '/concepts/search', params);
    }
}
