import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../../models/report';
import { Job } from '../../models/job';
import { JobRun } from '../../models/jobRun';
import { ReportingService } from '../../services/reporting.service';
import { HttpService } from '../../services/http.service';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

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
    activeJob: Job;
    activeRun: JobRun;
    filterType: string;
    reports: Report[];
    closeResult: string;
    parameters: string[];

    constructor(private reportingService: ReportingService,
                private httpService: HttpService,
                public modalService: NgbModal) {
    }

    ngOnInit() {
        this.reportSubscription = this.reportingService.getReports().subscribe(reports => {
            this.reports = reports;
        });
        this.parameters = [''];
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
        let params = {};

        for(let i = 0; i < this.activeJob.parameterNames.length; i++) {
            params[this.activeJob.parameterNames[i]] = this.parameters[i];
        }

        let temp = {
            jobName: '',
            parameters: {}
        };

        temp.jobName = this.activeJob.name;
        temp.parameters = params;

        this.httpService.postReportRun(temp, this.activeReport);
    }

    viewReport() {
        window.open(this.activeRun.resultUrl);
    }

    close(reason) {
        this.closeResult = reason;

        this.submitReport();

        this.modalService.dismissAll(reason);
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
