import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpService) {
    }

    getProjects() {
        return this.http.getProjects();
    }
}
