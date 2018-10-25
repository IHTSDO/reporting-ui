import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { ConceptService } from '../../services/concept.service';

import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-modal',
    templateUrl: './snomed-modal.component.html',
    styleUrls: ['./snomed-modal.component.scss']
})
export class SnomedModalComponent implements OnInit {

    @Input() query: Query;
    @Output() submitEmitter = new EventEmitter();
    inputs: string[] = [''];

    constructor(public modalService: ModalService,
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
        this.submitEmitter.emit();
    }
}
