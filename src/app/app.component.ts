import { Component, OnInit } from '@angular/core';
import { AuthoringService } from './services/authoring.service';
import { AuthenticationService } from './services/authentication.service';
// @ts-ignore
import { version } from './../../package.json';

import 'jquery';

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

                // $('<script>').attr({src: 'https://dev-workflow.ihtsdotools.org/s/eae63851c7444cb91c1a2fe49b048a36-T/9qqnuc/713005/8b99849fa1d8eaa169fd4a5dd7253186/2.0.31/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en&collectorId=dd01c5f4'}).appendTo('body');
                if (this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
                    $('<script>').attr({src: window.location.host + '/config/endpointConfig.json'}).appendTo('body');
                } else {
                    $('<script>').attr({src: this.authoringService.uiConfiguration.endpoints.collectorEndpoint}).appendTo('body');
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
                }
            },
            error => {
                window.location.replace(this.authoringService.uiConfiguration.endpoints.imsEndpoint
                    + 'login?serviceReferer=' + window.location.href);
            });


    }
}
