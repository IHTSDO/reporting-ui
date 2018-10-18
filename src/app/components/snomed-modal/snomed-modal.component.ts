import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Query } from '../../models/query';
import { ReportingService } from '../../services/reporting.service';
import { ConceptService } from '../../services/concept.service';

@Component({
    selector: 'app-snomed-modal',
    templateUrl: './snomed-modal.component.html',
    styleUrls: ['./snomed-modal.component.scss']
})
export class SnomedModalComponent implements OnInit {

    @Input() query: Query;
    inputs: string[] = [''];

    constructor(public modalService: ModalService,
                private reportingService: ReportingService,
                public conceptService: ConceptService) {
    }

    ngOnInit() {
    }

    activateTypeahead() {

    }

    setConcept(event, i) {
        this.inputs[i] = event;
        this.conceptService.typeaheadActive = false;
    }

    submitReportRequest() {
        this.reportingService.postReport(this.query, this.inputs).subscribe(data => {
            console.log(data);
        });
    }
}
