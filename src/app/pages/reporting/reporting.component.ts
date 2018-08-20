import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../../models/report';
import { ReportingService } from '../../services/reporting.service';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {

    reports: Report[];
    subscription: Subscription;

    constructor(private reportingService: ReportingService) {
        this.reportingService.getReports();
    }

    ngOnInit() {
        this.subscription = this.reportingService.fetchReports().subscribe(reports => {
            this.reports = reports;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
