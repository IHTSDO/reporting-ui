import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ReportingService } from '../../services/reporting.service';
import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-delete-modal',
    templateUrl: './snomed-delete-modal.component.html',
    styleUrls: ['./snomed-delete-modal.component.scss']
})
export class SnomedDeleteModalComponent implements OnInit {

    @Input() query: Query;

    constructor(public modalService: ModalService, private reportingService: ReportingService) {
    }

    ngOnInit() {
    }

    submitReportRequest() {
        this.reportingService.postReport(this.query).subscribe(() => {
            this.modalService.open = false;
        });
    }
}
