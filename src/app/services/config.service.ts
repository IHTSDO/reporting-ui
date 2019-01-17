import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public environmentEndpoint: string;

    constructor(private http: HttpService) {
        this.environmentEndpoint = window.location.host + '/';
    }

    getUIConfig() {
        return this.http.getUIConfig();
    }
}
