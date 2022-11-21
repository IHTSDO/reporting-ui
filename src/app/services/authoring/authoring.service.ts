import { Injectable } from '@angular/core';
import { UIConfiguration } from '../../models/uiConfiguration';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Versions } from '../../models/versions';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;
    private uiConfiguration = new Subject();
    private versions = new Subject();

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    setUIConfiguration(uiConfiguration) {
        this.uiConfiguration.next(uiConfiguration);
    }

    getUIConfiguration() {
        return this.uiConfiguration.asObservable();
    }

    httpGetUIConfiguration(): Observable<UIConfiguration> {
        return this.http.get<UIConfiguration>('/authoring-services/ui-configuration');
    }

    setVersions(versions) {
        this.versions.next(versions);
    }

    getVersions() {
        return this.versions.asObservable();
    }

    httpGetVersions(): Observable<Versions> {
        return this.http.get<Versions>('/config/versions.json');
    }
}
