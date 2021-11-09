import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import {Subject, Subscription} from 'rxjs';
import { AuthoringService } from '../authoring/authoring.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user = new Subject<User>();

    uiConfiguration: any;
    uiConfigurationSubscription: Subscription;

    constructor(private http: HttpClient, private authoringService: AuthoringService) {
        this.uiConfigurationSubscription = this.authoringService.getUIConfiguration().subscribe( data => this.uiConfiguration = data);
    }

    setUser(user) {
        this.user.next(user);
    }

    getUser() {
        return this.user.asObservable();
    }

    httpGetUser() {
        return this.http.get<User>('/auth');
    }

    logout() {
        window.location.href = this.uiConfiguration.endpoints.imsEndpoint + 'logout?serviceReferer=' + window.location.href;
    }
}
