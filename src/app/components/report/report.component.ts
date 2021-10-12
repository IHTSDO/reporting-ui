import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    reports: any[];
    reportsSubscription: Subscription;
    activeReport: any;
    activeReportSubscription: Subscription;

    constructor(private reportingService: ReportingService) {
        this.reportsSubscription = this.reportingService.getReports().subscribe( data => this.reports = data);
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe( data => this.activeReport = data);
    }

    ngOnInit(): void {
    }

}
