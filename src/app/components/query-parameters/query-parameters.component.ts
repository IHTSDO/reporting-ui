import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Query } from '../../models/query';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template/template.service';
import { AuthoringService } from '../../services/authoring/authoring.service';
import { UtilityService } from '../../services/utility/utility.service';
import { Concept } from '../../models/concept';
import { Observable } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {PathingService} from '../../services/pathing/pathing.service';
import {HttpService} from '../../services/http/http.service';
import {ReportingService} from '../../services/reporting/reporting.service';

@Component({
    selector: 'app-query-parameters',
    templateUrl: './query-parameters.component.html',
    styleUrls: ['./query-parameters.component.scss']
})
export class QueryParametersComponent implements OnInit {

    @ViewChild('textareaTypeahead', { static: false }) inputElement: ElementRef;

    templates: Template[];

    activeProject: any;
    activeProjectSubscription;
    activeReport: any;
    activeReportSubscription;

    // typeahead
    searchTerm: string;
    spinner = document.createElement('div');
    search = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        filter((text) => text.length > 2),
        distinctUntilChanged(),
        tap(() => document.activeElement.parentElement.appendChild(this.spinner)),
        switchMap(term => this.httpService.getTypeahead(term).pipe(
            tap(() => document.getElementById('spinner').remove(),
                catchError(tap(() => document.getElementById('spinner').remove()))
            ))
        ),
    )

    constructor(private templateService: TemplateService,
                private authoringService: AuthoringService,
                private httpService: HttpService,
                private pathingService: PathingService,
                private reportingService: ReportingService) {
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe(data => {
            this.activeReport = data;
            this.setupQueryParameters();
        });
        this.spinner.id = 'spinner';
        this.spinner.classList.add('spinner-border', 'spinner-border-sm', 'position-absolute');
        this.spinner.style.top = '7px';
        this.spinner.style.right = '7px';
    }

    ngOnInit() {
    }

    setupQueryParameters() {
        if (this.activeReport) {
            for (const key in this.activeReport.parameters) {
                if (this.activeReport.parameters.hasOwnProperty(key)) {
                    const parameter = this.activeReport.parameters[key];
                    if (parameter.type === 'BOOLEAN') {
                        parameter.value = JSON.parse(parameter.defaultValue);
                    }
                    if (parameter.type === 'HIDDEN') {
                        parameter.value = this.authoringService.environmentEndpoint + 'template-service';
                    }
                    if (parameter.type === 'CONCEPT_LIST') {
                        parameter.value = '';
                    }
                    if (!this.templates && parameter.type === 'TEMPLATE') {
                        this.templateService.getTemplateConcepts().subscribe(data => {
                            this.templates = data;
                        });
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
            this.httpService.getConceptsById(idList).subscribe(
                data => {
                    data['items'].forEach(concept => {
                        this.addToWhitelistReadyConcepts(concept, key);
                    });
                });
        }
    }

    addToWhitelistReadyConcepts(concept, key): void {
        this.searchTerm = '';

        if (this.activeReport.parameters[key].value.length > 1) {
            this.activeReport.parameters[key].value += ', ' + UtilityService.convertShortConceptToString(concept);
        } else {
            this.activeReport.parameters[key].value += UtilityService.convertShortConceptToString(concept);
        }
    }

    removeFromWhitelistReadyConcepts(concept, key): void {
        const re = new RegExp(concept.sctId + '[^,]+(, )?');
        this.activeReport.parameters[key].value = this.activeReport.parameters[key].value.replace(re, '');
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
