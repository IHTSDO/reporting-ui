import { Component, OnInit } from '@angular/core';
import { AuthoringService } from './services/authoring/authoring.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import 'jquery';
import {QueueService} from './services/queue/queue.service';
import {Subscription} from 'rxjs';
import {ReportingService} from './services/reporting/reporting.service';
import {ReleaseService} from './services/release/release.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    environment: string;
    managedServiceUser: boolean;

    queueOpen: any;
    queueOpenSubscription: Subscription;

    constructor(private authenticationService: AuthenticationService,
                private authoringService: AuthoringService,
                private queueService: QueueService,
                private reportingService: ReportingService,
                private releaseService: ReleaseService) {
        this.queueOpenSubscription = this.queueService.getQueueOpen().subscribe(data => this.queueOpen = data);
    }

    ngOnInit() {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];

        this.reportingService.httpInitialise().subscribe();

        this.authoringService.httpGetVersions().subscribe(versions => {
            this.authoringService.setVersions(versions);
        });

        this.authoringService.httpGetUIConfiguration().subscribe(config => {
            this.authoringService.setUIConfiguration(config);
            $('<script>').attr({ src: config.endpoints.collectorEndpoint }).appendTo('body');
        });

        this.authenticationService.httpGetUser().subscribe(user => {
            this.authenticationService.setUser(user);
        });

        this.reportingService.httpGetReleases().subscribe(data => {
            this.reportingService.setReleases(data);
        });

        this.releaseService.httpGetReleaseCenters().subscribe(data => {
            this.releaseService.setReleaseCenters(data);
        });

        this.assignFavicon();
    }

    assignFavicon() {
        const favicon = $('#favicon');

        switch (this.environment) {
            case 'local':
                favicon.attr('href', 'favicon_grey.ico');
                break;
            case 'dev':
                favicon.attr('href', 'favicon_red.ico');
                break;
            case 'uat':
                favicon.attr('href', 'favicon_green.ico');
                break;
            case 'training':
                favicon.attr('href', 'favicon_yellow.ico');
                break;
            default:
                favicon.attr('href', 'favicon.ico');
                break;
        }
    }
}
