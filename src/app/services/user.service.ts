import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpService) {
    }

    getLoggedInUser() {
        return this.http.getLoggedInUser();
    }
}
