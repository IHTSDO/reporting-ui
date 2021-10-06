import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    textFilter: string;
    categoryFilter: string;

    reports: any[];
    reportsSubscription: Subscription;
    user: any;
    msUser = false;
    userSubscription: Subscription;
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

    constructor(private reportingService: ReportingService, private authenticationService: AuthenticationService) {
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
        if (this.activeReport === report) {
            this.reportingService.setActiveReport(null);
        } else {
            this.reportingService.setActiveReport(report);
        }
    }
}
