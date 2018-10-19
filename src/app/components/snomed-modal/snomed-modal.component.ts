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
        this.query.parameterSubmissions = [];

        for(let i = 0; i < this.query.parameterNames.length; i++) {
            this.query.parameterSubmissions.push('');
        }
    }

    activateTypeahead(input) {
        if(input.length > 2) {
            this.conceptService.typeaheadActive = true;
        }
        else {
            this.conceptService.typeaheadActive = false;
        }
    }

    setConcept(event, i) {
        this.query.parameterSubmissions[i] = event;
        this.conceptService.typeaheadActive = false;
    }

    submitReportRequest() {
        this.reportingService.postReport(this.query, this.query.parameterSubmissions).subscribe(data => {
            console.log(data);
        });
    }
}
