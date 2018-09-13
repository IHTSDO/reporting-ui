import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../../models/report';
import { JobRun } from '../../models/jobRun';
import { ReportingService } from '../../services/reporting.service';
import { HttpService } from '../../services/http.service';
import {NgbModal, ModalDismissReasons, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {SubmitModal} from '../../components/submit-modal/submit-modal.component';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {

    reportSubscription: Subscription;
    runsSubscription: Subscription;
    currentRuns: JobRun[];
    activeReport: string;
    activeRun: JobRun;
    filterType: string;
    reports: Report[];

    constructor(private reportingService: ReportingService,
                private httpService: HttpService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.reportSubscription = this.reportingService.getReports().subscribe(reports => {
            this.reports = reports;
        });
        this.filterType = 'General QA'
    }

    ngOnDestroy() {
        this.reportSubscription.unsubscribe();
    }

    filterTypeSwitch(type) {
        if (this.filterType !== type) {
            this.filterType = type;
        } else {
            this.filterType = null;
        }
    }

    activeReportSwitch($event: NgbPanelChangeEvent) {
        if (this.activeReport !== $event.panelId) {
            this.currentRuns = null;
            this.activeReport = $event.panelId;
            this.httpService.getReportRuns($event.panelId);
            this.reportingService.getReportRuns($event.panelId).subscribe(runs => {
                this.currentRuns = runs;
            });
                
        } else {
            this.activeReport = null;
        }
    }
    
    
    activeRunSwitch(run) {
        if (this.activeRun !== run) {
            this.activeRun = run;
        } else {
            this.activeRun = null;
        }
    }

    submitReport() {
        let job = {};
        const modalRef = this.modalService.open(SubmitModal);
//        this.httpService.runReport(job, this.activeReport);
//        this.httpService.getReportRuns(this.activeReport);
//        this.reportingService.getReportRuns(this.activeReport).subscribe(runs => {
//            this.currentRuns = runs;
//        });
    }
    viewReport() {
        window.open(this.activeRun.result)
    }
}
