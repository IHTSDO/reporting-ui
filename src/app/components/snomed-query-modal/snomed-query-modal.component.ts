import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../services/modal.service';

import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-query-modal',
    templateUrl: './snomed-query-modal.component.html',
    styleUrls: ['./snomed-query-modal.component.scss']
})
export class SnomedQueryModalComponent implements OnInit {

    @Input() query: Query;
    @Output() submitEmitter = new EventEmitter();

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
