import { Component, OnInit } from '@angular/core';
import { AuthoringService } from './services/authoring/authoring.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import 'jquery';
import { QueueService } from './services/queue/queue.service';
import { Subscription, forkJoin } from 'rxjs';
import { ReportingService } from './services/reporting/reporting.service';
import { ReleaseService } from './services/release/release.service';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ReportComponent } from './components/report/report.component';
import { CommonModule } from '@angular/common';
import { QueueComponent } from './components/queue/queue.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DrawerService } from './services/drawer.service';
import { ConfigService } from './services/config.service';
import { User } from './models/user';

declare global {
    interface Window {
        ATL_JQ_PAGE_PROPS: any;
        ATL_JQ_CONFIGS: any;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [SnomedNavbarComponent, LeftSidebarComponent, ReportComponent, CommonModule, QueueComponent, SnomedFooterComponent, DrawerComponent]
})

export class AppComponent implements OnInit {

    user: User;

    environment: string;
    managedServiceUser: boolean;

    queueOpen: any;
    queueOpenSubscription: Subscription;

    drawerOpen: any;
    drawerOpenSubscription: Subscription;

    constructor(private authenticationService: AuthenticationService,
        private authoringService: AuthoringService,
        private queueService: QueueService,
        private drawerService: DrawerService,
        private configService: ConfigService,
        private reportingService: ReportingService,
        private releaseService: ReleaseService) {
        this.queueOpenSubscription = this.queueService.getQueueOpen().subscribe(data => this.queueOpen = data);
        this.drawerOpenSubscription = this.drawerService.getDrawerOpen().subscribe(data => this.drawerOpen = data);
    }

    ngOnInit() {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];

        this.reportingService.httpInitialise().subscribe();

        this.authoringService.httpGetVersions().subscribe(versions => {
            this.authoringService.setVersions(versions);
        });

        this.releaseService.httpGetReleases().subscribe(data => {
            this.reportingService.setReleases(data);
        });

        this.releaseService.httpGetReleaseCenters().subscribe(data => {
            this.releaseService.setReleaseCenters(data);
        });

        this.configService.loadConfig().subscribe(data => {
            forkJoin({
                user: this.authenticationService.httpGetUser(),
                uiConfig: this.authoringService.httpGetUIConfiguration()
            }).subscribe(({ user, uiConfig }) => {
                // Handle user data
                this.user = user;
                this.authenticationService.setUser(user);

                // Handle config data
                this.authoringService.setUIConfiguration(uiConfig);

                this.initializeIssueCollector(user, uiConfig);
            });
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

    // Prepare Issue Collector configuration BEFORE loading the script
    private extractCollectorIdFromUrl(url) {
        try {
            if (!url) { return null; }
            var match = url.match(/[?&]collectorId=([^&]+)/);
            return match ? decodeURIComponent(match[1]) : null;
        } catch (e) { return null; }
    }

    private extractBaseUrl(url) {
        try {
            if (!url) { return null; }
            var a = document.createElement('a');
            a.href = url;
            return a.protocol + '//' + a.host;
        } catch (e) { return null; }
    }

    private initializeIssueCollector(user: User, uiConfig: any) {
        var standardCollectorUrl = uiConfig.endpoints.collectorEndpoint || '';
        var msCollectorUrl = uiConfig.endpoints.msCollectorEndpoint || '';
        var standardCollectorId = this.extractCollectorIdFromUrl(standardCollectorUrl);
        var standardBaseUrl = this.extractBaseUrl(standardCollectorUrl);
        var managedServiceUser = user.roles.includes('ROLE_ms-users');


        if (managedServiceUser) {
            // Managed service: NOT an issue collector. Open the MS endpoint in a new tab.
            jQuery('#jiraIssueCollector').off('click.atlassianCollector atlassianCollectorMs')
                .on('click.atlassianCollectorMs', function (e) {
                    e.preventDefault();
                    var targetUrl = uiConfig.endpoints.msCollectorEndpoint || msCollectorUrl || 'https://support.servicedesk.snomed.org/servicedesk/customer/user/login?destination=portals';
                    window.open(targetUrl, '_blank');
                });
        } else {
            // Standard Jira issue collector
            // Provide trigger and field values
            window.ATL_JQ_PAGE_PROPS = window.ATL_JQ_PAGE_PROPS || {};
            window.ATL_JQ_PAGE_PROPS.triggerFunction = function (showCollectorDialog) {
                jQuery('#jiraIssueCollector').off('click.atlassianCollector').on('click.atlassianCollector', function (e) {
                    e.preventDefault();
                    showCollectorDialog();
                });
            };
            window.ATL_JQ_PAGE_PROPS.fieldValues = {
                'fullname': user.firstName + ' ' + user.lastName,
                'email': user.email
            };
            if (standardCollectorId) {
                window.ATL_JQ_PAGE_PROPS[standardCollectorId] = {
                    triggerFunction: window.ATL_JQ_PAGE_PROPS.triggerFunction,
                    fieldValues: window.ATL_JQ_PAGE_PROPS.fieldValues
                };
            }

            // Force CUSTOM trigger with correct baseUrl for the standard collector
            window.ATL_JQ_CONFIGS = window.ATL_JQ_CONFIGS || {};
            if (standardCollectorId) {
                window.ATL_JQ_CONFIGS[standardCollectorId] = {
                    enabled: true,
                    triggerText: 'Raise an Issue',
                    triggerPosition: 'CUSTOM',
                    baseUrl: standardBaseUrl || 'https://dev-workflow.ihtsdotools.org'
                };
            }

            // Load the standard issue collector script AFTER configuration
            $('<script>').attr({ src: uiConfig.endpoints.collectorEndpoint }).appendTo('body');
        }
    }
}
