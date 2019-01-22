import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Query } from '../../models/query';
import { TemplateService } from '../../services/template.service';
import { Template } from '../../models/template';


@Component({
    selector: 'app-snomed-query-modal',
    templateUrl: './snomed-query-modal.component.html',
    styleUrls: ['./snomed-query-modal.component.scss']
})
export class SnomedQueryModalComponent implements OnInit {

    @Input() query: Query;
    @Output() submitEmitter = new EventEmitter();
    @Output() closeEmitter = new EventEmitter();

    @ViewChild('textareaTypeahead') inputElement: ElementRef;

    searchTerm: string;
    templates: Template[];

    constructor(private templateService: TemplateService) {
    }

    ngOnInit() {
        this.templateService.getTemplateConcepts().subscribe(data => {
            this.templates = data;
            console.log('TEMPLATES: ', this.templates);
        });

        for(let key in this.query.parameters['parameterMap']) {
            if(this.query.parameters['parameterMap'][key].type === 'BOOLEAN') {
                this.query.parameters['parameterMap'][key].value = false
            }
        }
    }

    submitReportRequest() {
        this.submitEmitter.emit();
        this.closeEmitter.emit();
    }

    appendConcept(parameter, result) {

        this.inputElement.nativeElement.focus();

        if(parameter.includes(',')) {
            return parameter.slice(0, parameter.lastIndexOf(',')) + ', ' + result;
        }
        else {
            return result;
        }
    }
}
