import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Query } from '../../models/query';
import { TemplateService } from '../../services/template.service';
import { Template } from '../../models/template';
import { UtilityService } from '../../services/utility.service';
import { AuthoringService } from '../../services/authoring.service';

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
    projects: object[];

    constructor(private templateService: TemplateService, private authoringService: AuthoringService) {
    }

    ngOnInit() {
        this.templateService.getTemplateConcepts().subscribe(data => {
            this.templates = data;
        });

        this.authoringService.getProjects().subscribe(data => {
            this.projects = data;
        });

        for (const key in this.query.parameters['parameterMap']) {
            if (this.query.parameters['parameterMap'].hasOwnProperty(key)) {
                const parameter = this.query.parameters['parameterMap'][key];
                if (parameter.type === 'BOOLEAN') {
                    parameter.value = JSON.parse(parameter.defaultValue);
                }
                if (parameter.type === 'PROJECT') {
                    parameter.value = 'MAIN';
                }
                if (parameter.type === 'HIDDEN') {
                    parameter.value = this.authoringService.environmentEndpoint + 'template-service';
                }
            }
        }
    }

    convertConceptObjectToString(input) {
        return UtilityService.convertConceptObjectToString(input);
    }

    submitReportRequest() {
        this.submitEmitter.emit();
        this.closeEmitter.emit();
    }

    appendConcept(stringList, string) {

        this.inputElement.nativeElement.focus();

        if (stringList.includes(',')) {
            return UtilityService.appendStringToStringList(stringList, string);
        } else {
            return string;
        }
    }
}
