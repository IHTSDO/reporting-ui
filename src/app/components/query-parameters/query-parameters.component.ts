import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Query } from '../../models/query';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template.service';
import { AuthoringService } from '../../services/authoring.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'app-query-parameters',
    templateUrl: './query-parameters.component.html',
    styleUrls: ['./query-parameters.component.scss']
})
export class QueryParametersComponent implements OnChanges {

    @Input() query: Query;

    @ViewChild('textareaTypeahead', { static: false }) inputElement: ElementRef;

    searchTerm: string;
    templates: Template[];
    projects: object[];

    constructor(private templateService: TemplateService, private authoringService: AuthoringService) {
    }

    ngOnChanges(): void {
        if (this.query) {
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
    }

    convertConceptObjectToString(input): string {
        return UtilityService.convertConceptObjectToString(input);
    }

    appendConcept(stringList, string): string {

        this.inputElement.nativeElement.focus();

        if (stringList.includes(',')) {
            return UtilityService.appendStringToStringList(stringList, string);
        } else {
            return string;
        }
    }
}
