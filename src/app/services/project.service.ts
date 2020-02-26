import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor() {
    }

    private activeProject = new Subject<Project>();
    private projects = new Subject<Project[]>();

    // Setters & Getters: BranchPath
    setProjects(path) {
        this.projects.next(path);
    }

    getProjects(): Observable<Project[]> {
        return this.projects.asObservable();
    }

    // Setters & Getters: BranchPath
    setActiveProject(path) {
        this.activeProject.next(path);
    }

    getActiveProject(): Observable<Project> {
        return this.activeProject.asObservable();
    }
}
