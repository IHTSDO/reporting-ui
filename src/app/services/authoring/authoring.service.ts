import { Injectable } from '@angular/core';
import { UIConfiguration } from '../../models/uiConfiguration';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Versions } from '../../models/versions';
import { Project } from '../../models/project';
import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;
    private projects = new Subject();
    private activeProject = new Subject();
    private uiConfiguration = new Subject();
    private versions = new Subject();

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    setActiveProject(project) {
        this.activeProject.next(project);
    }

    getActiveProject() {
        return this.activeProject.asObservable();
    }

    setProjects(projects) {
        this.projects.next(projects);
    }

    getProjects() {
        return this.projects.asObservable();
    }

    httpGetProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/authoring-services/projects?lightweight=true');
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
