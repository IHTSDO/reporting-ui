import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsPipe } from '../../pipes/tags/tags.pipe';
import { AlphabeticalPipe } from '../../pipes/alphabetical/alphabetical.pipe';
import { TextFilterPipe } from '../../pipes/text-filter/text-filter.pipe';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, TagsPipe, AlphabeticalPipe, TextFilterPipe]
})
export class LeftSidebarComponent implements OnInit {

    textFilter: string;
    categoryFilter: string;

    serviceError: boolean = false;

    user: any;
    msUser = false;
    userSubscription: Subscription;
    reports: any[];
    reportsSubscription: Subscription;
    activeReport: any;
    activeReportSubscription: Subscription;
    pagination: number;
    paginationSubscription: Subscription;

    colors = [
        'spring-rain',
        'london-hue',
        'vanilla',
        'dull-lavender',
        'tonys-pink',
        'green-mist',
        'ghostly-grey',
        'porsche-orange',
        'sunflower-yellow'
    ];

    constructor(private reportingService: ReportingService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
        this.reportsSubscription = this.reportingService.getReports().subscribe( data => this.reports = data);
        this.paginationSubscription = this.reportingService.getPagination().subscribe( data => this.pagination = data);
        this.userSubscription = this.authenticationService.getUser().subscribe( data => {
            this.user = data;
            this.msUser = this.user.roles.includes('ROLE_ms-users');
        });
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe( data => this.activeReport = data);
    }

    ngOnInit() {
        this.reportingService.httpGetReports().subscribe(data => {
            this.reportingService.setReports(data);
        }, error => {
            this.serviceError = true;
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
        this.reportingService.setPagination(0);
        this.reportingService.setRuns(null);

        if (this.activeReport && this.activeReport.name === report.name) {
            this.reportingService.setActiveReport(null);
            this.setQueryParam(null);
        } else {
            this.reportingService.setActiveReport(report);
            this.setQueryParam({report: report.name});
        }
    }

    getFilteredReportJobs() {
        let jobs = [];
        this.reports.forEach(report => {
            if (!this.categoryFilter || report.name === this.categoryFilter) {
                jobs = jobs.concat(report.jobs);
            }
        });
        return jobs;
    }

    setQueryParam(params) {
        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: params
            });
    }
}
