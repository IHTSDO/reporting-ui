import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class WhitelistService {

    constructor(private http: HttpService) {
    }

    getWhitelist(name) {
        return this.http.getWhitelist(name);
    }

    postWhitelist(name, whitelist) {
        return this.http.postWhitelist(name, whitelist);
    }
}
