import { Component, OnInit } from '@angular/core';
import { AuthoringService } from './services/authoring.service';
import { AuthenticationService } from './services/authentication.service';
// @ts-ignore
import { version } from './../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    public version: string = version;

    constructor(private authenticationService: AuthenticationService, private authoringService: AuthoringService) {
    }

    ngOnInit() {
        console.log('Version:', version);

        this.authoringService.getUIConfiguration().subscribe(
            data => {
                this.authoringService.uiConfiguration = data;
            },
            error => {
                console.error('ERROR: UI Config failed to load');
            });

        this.authenticationService.getLoggedInUser().subscribe(
            user => {
                if (!user) {
                    window.location.replace(this.authoringService.uiConfiguration.endpoints.imsEndpoint
                        + 'login?serviceReferer=' + window.location.href);
                }
            },
            error => {
                window.location.replace(this.authoringService.uiConfiguration.endpoints.imsEndpoint
                    + 'login?serviceReferer=' + window.location.href);
            });


    }
}
