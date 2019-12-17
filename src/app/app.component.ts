import { Component, OnInit } from '@angular/core';
import { AuthoringService } from './services/authoring.service';
import { AuthenticationService } from './services/authentication.service';
import 'jquery';
import { Versions } from './models/versions';
import { UIConfiguration } from './models/uiConfiguration';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    environment: string;
    managedService: boolean;
    versions: Versions;
    uiConfiguration: UIConfiguration;
    constructor(private authenticationService: AuthenticationService, private authoringService: AuthoringService) {
    }

    ngOnInit() {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.managedService = window.location.host.split(/[.]/)[0].includes('ms-');

        this.authoringService.getVersion().subscribe(
            data => {
                this.versions = data;

                console.log('Reporting UI Version:', data.versions['reporting-ui']);
                console.log('Schedule Manager Version:', data.versions['schedule-manager']);
                console.log('Snowstorm Version:', data.versions['snowstorm']);
            }
        );

        this.authoringService.getUIConfiguration().subscribe(
            data => {
                this.authoringService.uiConfiguration = data;
                this.uiConfiguration = data;
                if (this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
                    this.authoringService.getSnowowlConfiguration().subscribe(
                        snowowlData => {
                            $('<script>').attr({ src: snowowlData.endpoints.collectorEndpoint }).appendTo('body');
                        });
                } else {
                    $('<script>').attr({ src: this.authoringService.uiConfiguration.endpoints.collectorEndpoint }).appendTo('body');
                }
            },
            error => {
                console.error('ERROR: UI Config failed to load');
            });

        this.authenticationService.getLoggedInUser().subscribe(
            user => {
                if (!user) {
                    window.location.replace(this.authoringService.uiConfiguration.endpoints.imsEndpoint
                        + 'login?serviceReferer=' + window.location.href);
                } else {
                    this.authenticationService.roles = user.roles;
                }
            },
            error => {
                window.location.replace(this.authoringService.uiConfiguration.endpoints.imsEndpoint
                    + 'login?serviceReferer=' + window.location.href);
            });


    }
}
