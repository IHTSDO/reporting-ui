import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    textFilter: string;
    categoryFilter: string;

    user: any;
    msUser = false;
    userSubscription: Subscription;
    reports: any[];
    reportsSubscription: Subscription;
    activeReport: any;
    activeReportSubscription: Subscription;

    colors = [
        'spring-rain',
        'london-hue',
        'vanilla',
        'dull-lavender',
        'tonys-pink',
        'green-mist'
    ];

    constructor(private reportingService: ReportingService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
        this.reportsSubscription = this.reportingService.getReports().subscribe( data => this.reports = data);
        this.userSubscription = this.authenticationService.getUser().subscribe( data => {
            this.user = data;
            this.msUser = this.user.roles.includes('ROLE_ms-users');
        });
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe( data => this.activeReport = data);
    }

    ngOnInit() {
        this.reportingService.httpGetReports().subscribe(data => {
            this.reportingService.setReports(data);
        });
    }

    selectCategory(category) {
        if (this.categoryFilter === category) {
            this.categoryFilter = null;
        } else {
            this.categoryFilter = category;
        }
    }

    selectReport(report) {
        this.reportingService.setRuns(null);

        if (this.activeReport && this.activeReport.name === report.name) {
            this.reportingService.setActiveReport(null);
            this.setQueryParam(null);
        } else {
            this.reportingService.setActiveReport(report);
            this.setQueryParam({report: report.name});
        }
    }

    setQueryParam(params) {
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: params
            });
    }
}
