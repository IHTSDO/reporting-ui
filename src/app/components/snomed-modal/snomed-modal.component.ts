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
        for(let key in this.query.parameters['parameterMap']) {
            if(this.query.parameters['parameterMap'][key].type === 'BOOLEAN') {
                this.query.parameters['parameterMap'][key].value = false
            }
        }
    }

    submitReportRequest() {
        this.submitEmitter.emit();
    }
}
