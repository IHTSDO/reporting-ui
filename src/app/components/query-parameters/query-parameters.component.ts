import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Query } from '../../models/query';
import { Template } from '../../models/template';
import { TemplateService } from '../../services/template/template.service';
import { AuthoringService } from '../../services/authoring/authoring.service';
import { UtilityService } from '../../services/utility/utility.service';
import { Concept } from '../../models/concept';
import { EMPTY, Observable, Subscription } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
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
    releases: any;
    selectedReleaseMap: Map<string, string> = new Map<string, string>();

    activeCodeSystemShortName: string;
    activeProject: any;
    activeProjectSubscription;
    activeReport: any;
    activeReportSubscription;
    activeBranchSubscription: Subscription;

    // typeahead
    searchTerm: string;
    spinner = document.createElement('div');
    search = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        filter((text) => text.length > 2),
        distinctUntilChanged(),
        tap(() => document.activeElement.parentElement.appendChild(this.spinner)),
        switchMap(term => this.httpService.getTypeahead(term).pipe(
            map(results => {
                document.getElementById('spinner').remove();
                return results;
            }),
            catchError((error) => {
                console.log(error);
                return EMPTY;
            })
        )),
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
            this.selectedReleaseMap.clear();
        });
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => {
            if (data) {
                if (data.hasOwnProperty('shortName')) {
                    const shortName = data['shortName'];
                    this.activeCodeSystemShortName = shortName.includes('-') ? shortName.split('-')[1] : 'INT';
                } else if (data.hasOwnProperty('branchPath')) {
                    const branchPath = data['branchPath'];
                    this.activeCodeSystemShortName = branchPath.includes('-') ? branchPath.split('-')[1] : 'INT';
                }
            }
            this.selectedReleaseMap.clear();
            this.setupQueryParameters();
        });
        this.spinner.id = 'spinner';
        this.spinner.classList.add('spinner-border', 'spinner-border-sm', 'position-absolute');
        this.spinner.style.top = '10px';
        this.spinner.style.right = '10px';
    }

    ngOnInit(): void {
        this.reportingService.getReleases().subscribe(releases => {
            this.releases = releases;
        });
    }

    setupQueryParameters() {
        if (this.activeReport) {
            for (const key in this.activeReport.parameters) {
                if (this.activeReport.parameters.hasOwnProperty(key)) {
                    const parameter = this.activeReport.parameters[key];
                    if (parameter.type === 'BOOLEAN') {
                        parameter.value = JSON.parse(parameter.value);
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
                    if (parameter.type === 'CHECKBOXES') {
                        const vals = [];

                        parameter.options.forEach(item => {
                            if (parameter.values.includes(item)) {
                                vals.push(true);
                            } else {
                                vals.push(false);
                            }
                        });

                        parameter.values = vals;
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

    onReleaseChange(parameterKey, value): void {
        this.selectedReleaseMap.set(parameterKey, value);
    }

    getSortedFilenames(releases: any[]): string[] {
        return releases.sort((a, b) => b.effectiveTime - a.effectiveTime).map(release => release.filename);
    }
    
    getDependencies(key: string): string[] {
        let dependencies = [];
        const releases = this.releases[this.activeCodeSystemShortName];
        if (releases) {
            for (const release of releases) {
                if (release.dependencies && ((key === 'This Dependency' && this.selectedReleaseMap.has('This Release') && this.selectedReleaseMap.get('This Release') === release.filename)
                    || (key === 'Previous Dependency' && this.selectedReleaseMap.has('Previous Release') && this.selectedReleaseMap.get('Previous Release') === release.filename))) {
                        dependencies = dependencies.concat(release.dependencies);
                }
            }
        }
        return dependencies.length > 0 ? this.getSortedFilenames(dependencies) : [];
    }
    
    getReleaseArchiveOptions(parameter): string[] {
        if (!this.releases) {
            return [];
        }
        
        const key = parameter.key;
        if (key === 'This Dependency' || key === 'Previous Dependency') {
            return this.getDependencies(key);
        } 
    
        if (parameter.value && parameter.value.options && parameter.value.options.length !== 0) {
            const codeSystemShortName = parameter.value.options[0];
            const releases = this.releases[codeSystemShortName];
            return releases ? this.getSortedFilenames(releases) : [];
        } 
    
        let releases = this.releases[this.activeCodeSystemShortName];
        if (releases) {
            if (key === 'Previous Release' && this.selectedReleaseMap.has('This Release')) {
                releases = releases.filter(release => release.filename !== this.selectedReleaseMap.get('This Release'));
            }
            return this.getSortedFilenames(releases);
        } 
    
        return [];
    }yy

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
        } else {
            return null;
        }
    }
}
