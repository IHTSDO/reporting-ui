import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Query } from '../../models/query';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template.service';
import { AuthoringService } from '../../services/authoring.service';
import { UtilityService } from '../../services/utility.service';
import { Concept } from '../../models/concept';
import { TerminologyServerService } from '../../services/terminologyServer.service';

@Component({
    selector: 'app-query-parameters',
    templateUrl: './query-parameters.component.html',
    styleUrls: ['./query-parameters.component.scss']
})
export class QueryParametersComponent implements OnChanges {

    @Input() query: Query;

    @ViewChild('textareaTypeahead', { static: false }) inputElement: ElementRef;

    readyConceptSearchTerm: string;
    searchTerm: string;
    templates: Template[];
    projects: object[];

    constructor(private templateService: TemplateService, private authoringService: AuthoringService,
                private terminologyService: TerminologyServerService) {
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
                    if (parameter.type === 'CONCEPT_LIST') {
                        parameter.value = '';
                    }
                }
            }
        }
    }

    retrieveConceptsById(input, key): void {
        let idList = [];
        if (input) {
            idList = input.replace(/\s/g, '').split(',');
        }

        if (idList.length > 0) {
            this.terminologyService.getConceptsById(idList).subscribe(
                data => {
                    // @ts-ignore
                    data.items.forEach(concept => {
                        this.addToWhitelistReadyConcepts(concept, key);
                    });
                });
        }


    }

    addToWhitelistReadyConcepts(concept, key): void {
        this.readyConceptSearchTerm = '';

        if (this.query.parameters['parameterMap'][key].value.length > 1) {
            this.query.parameters['parameterMap'][key].value += ', ' + UtilityService.convertShortConceptToString(concept);
        } else {
            this.query.parameters['parameterMap'][key].value += UtilityService.convertShortConceptToString(concept);
        }
    }

    convertShortConceptToString(input: Concept): string {
        return UtilityService.convertShortConceptToString(input);
    }

    convertStringListToShortConceptList(input: string): Concept[] {
        if (input) {
            return UtilityService.convertStringListToShortConceptList(input);
        }
    }
}
