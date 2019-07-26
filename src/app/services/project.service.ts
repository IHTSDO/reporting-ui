import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UIConfiguration } from '../models/uiConfiguration';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    public environmentEndpoint: string;

    constructor(private http: HttpService) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    uiConfiguration: UIConfiguration;

    getProjects() {
        return this.http.getProjects();
    }

    getUIConfiguration() {
        return this.http.getUIConfiguration();
    }
}
