import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Query } from '../../models/query';
import { TemplateService } from '../../services/template.service';
import { Template } from '../../models/template';
import { ConfigService } from '../../services/config.service';
import { ProjectService } from '../../services/project.service';

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

    constructor(private templateService: TemplateService, private configService: ConfigService, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.templateService.getTemplateConcepts().subscribe(data => {
            this.templates = data;
        });

        this.projectService.getProjects().subscribe(data => {
            this.projects = data;
        });

        for (const key in this.query.parameters['parameterMap']) {
            if (this.query.parameters['parameterMap'].hasOwnProperty(key)) {
                const parameter = this.query.parameters['parameterMap'][key];

                if (parameter.type === 'BOOLEAN') {
                    parameter.value = JSON.parse(parameter.defaultValue);
                }

                if (parameter.type === 'HIDDEN') {
                    parameter.value = this.configService.environmentEndpoint + 'template-service';
                }
            }
        }
    }

    convertConceptObjectToString(concept) {
        return concept.id + ' |' + concept.fsn.term + '|';
    }

    submitReportRequest() {
        this.submitEmitter.emit();
        this.closeEmitter.emit();
    }

    appendConcept(parameter, result) {

        this.inputElement.nativeElement.focus();

        if (parameter.includes(',')) {
            return parameter.slice(0, parameter.lastIndexOf(',')) + ', ' + result;
        } else {
            return result;
        }
    }
}
