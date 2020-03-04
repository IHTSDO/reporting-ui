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
    setProjects(projects) {
        this.projects.next(projects);
    }

    getProjects(): Observable<Project[]> {
        return this.projects.asObservable();
    }

    // Setters & Getters: BranchPath
    setActiveProject(project) {
        this.activeProject.next(project);
    }

    getActiveProject(): Observable<Project> {
        return this.activeProject.asObservable();
    }
}
