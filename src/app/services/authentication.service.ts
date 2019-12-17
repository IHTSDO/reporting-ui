import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public roles: string[];

    constructor(private http: HttpClient) {
    }

    getLoggedInUser(): Observable<User> {
        return this.http.get<User>('/auth');
    }
}
