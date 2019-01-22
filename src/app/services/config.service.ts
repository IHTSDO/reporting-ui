import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpService) {
    }

    getUIConfig() {
        return this.http.getUIConfig();
    }
}
