import { Injectable } from '@angular/core';
import { UIConfiguration } from '../models/uiConfiguration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;
    uiConfiguration: UIConfiguration;
    options: object;

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.options = {headers: headers};
    }

    getProjects(): Observable<object[]> {
        return this.http.get<object[]>('/authoring-services/projects');
    }

    getUIConfiguration(): Observable<UIConfiguration> {
        return this.http.get<UIConfiguration>('/authoring-services/ui-configuration');
    }
}
