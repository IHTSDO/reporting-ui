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

    subscription: Subscription;
    reports: Report[];
    activeReport: Report;
    filterType: string;

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.subscription = this.reportingService.getReports().subscribe(reports => {
            this.reports = reports;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterTypeSwitch(type) {
        if(this.filterType !== type) {
            this.filterType = type;
        } else {
            this.filterType = null;
        }
    }

    submitReport() {
        console.log(this.activeReport);
    }
}
