import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../services/modal.service';

import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-modal',
    templateUrl: './snomed-modal.component.html',
    styleUrls: ['./snomed-modal.component.scss']
})
export class SnomedModalComponent implements OnInit {

    @Input() query: Query;
    @Output() submitEmitter = new EventEmitter();
    typeahead: boolean = false;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
        this.query.parameterSubmissions = [];

        for (let i = 0; i < this.query.parameterNames.length; i++) {
            this.query.parameterSubmissions.push('');
        }
    }

    setConcept(event, i) {
        this.query.parameterSubmissions[i] = event;
        this.typeahead = false;
    }

    submitReportRequest() {
        this.submitEmitter.emit();
    }
}
