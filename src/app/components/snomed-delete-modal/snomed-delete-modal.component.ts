import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { Report } from '../../models/report';

@Component({
    selector: 'app-snomed-delete-modal',
    templateUrl: './snomed-delete-modal.component.html',
    styleUrls: ['./snomed-delete-modal.component.scss']
})
export class SnomedDeleteModalComponent implements OnInit {

    @Input() report: Report;
    @Output() closeEmitter = new EventEmitter();

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
    }

    submitReportRequest() {
        this.reportingService.postDeleteReport(this.report).subscribe(() => {
            this.closeEmitter.emit();
        });
    }
}
