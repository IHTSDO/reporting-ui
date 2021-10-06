import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Query } from '../../models/query';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template/template.service';
import { AuthoringService } from '../../services/authoring/authoring.service';
import { UtilityService } from '../../services/utility/utility.service';
import { Concept } from '../../models/concept';
import { TerminologyServerService } from '../../services/terminologyServer/terminologyServer.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';

@Component({
    selector: 'app-query-parameters',
    templateUrl: './query-parameters.component.html',
    styleUrls: ['./query-parameters.component.scss']
})
export class QueryParametersComponent implements OnChanges {

    @Input() query: Query;

    @ViewChild('textareaTypeahead', { static: false }) inputElement: ElementRef;

    templates: Template[];

    private activeProject: any;
    private activeProjectSubscription;

    // typeahead
    searchTerm: string;
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => term.length < typeaheadMinimumLength ? []
                : this.terminologyService.getTypeahead(term))
        )

    constructor(private templateService: TemplateService,
                private authoringService: AuthoringService,
                private terminologyService: TerminologyServerService) {
        this.activeProjectSubscription = this.authoringService.getActiveProject().subscribe(data => this.activeProject = data);
    }

    ngOnChanges(): void {
        if (this.query) {
            this.templateService.getTemplateConcepts().subscribe(data => {
                this.templates = data;
            });

            for (const key in this.query.parameters) {
                if (this.query.parameters.hasOwnProperty(key)) {
                    const parameter = this.query.parameters[key];
                    if (parameter.type === 'BOOLEAN') {
                        parameter.value = JSON.parse(parameter.defaultValue);
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
            idList = input.match(/[0-9]{4,16}/g);
        }


        if (idList && idList.length > 0) {
            this.terminologyService.getConceptsById(idList).subscribe(
                data => {
                    data['items'].forEach(concept => {
                        this.addToWhitelistReadyConcepts(concept, key);
                    });
                });
        }
    }

    addToWhitelistReadyConcepts(concept, key): void {
        this.searchTerm = '';

        if (this.query.parameters[key].value.length > 1) {
            this.query.parameters[key].value += ', ' + UtilityService.convertShortConceptToString(concept);
        } else {
            this.query.parameters[key].value += UtilityService.convertShortConceptToString(concept);
        }
    }

    removeFromWhitelistReadyConcepts(concept, key): void {
        const re = new RegExp(concept.sctId + '[^,]+(, )?');
        this.query.parameters[key].value = this.query.parameters[key].value.replace(re, '');
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
