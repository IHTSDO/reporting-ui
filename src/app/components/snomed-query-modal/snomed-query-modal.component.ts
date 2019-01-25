import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Query } from '../../models/query';
import { TemplateService } from '../../services/template.service';
import { Template } from '../../models/template';
import { ConfigService } from '../../services/config.service';

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

    constructor(private templateService: TemplateService, private configService: ConfigService) {
    }

    ngOnInit() {
        this.templateService.getTemplateConcepts().subscribe(data => {
            this.templates = data;
        });

        for(let key in this.query.parameters['parameterMap']) {
            let parameter = this.query.parameters['parameterMap'][key];

            if(parameter.type === 'BOOLEAN') {
                parameter.value = false
            }

            if(parameter.type === 'HIDDEN') {
                parameter.value = this.configService.environmentEndpoint + 'template-service';
            }
        }

        console.log('PARAMS: ', this.query.parameters['parameterMap']);
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
