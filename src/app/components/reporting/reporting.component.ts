import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ReportingService } from '../../services/reporting.service';

import { Category } from '../../models/category';
import { Query } from '../../models/query';
import { Report } from '../../models/report';
import { AuthoringService } from '../../services/authoring.service';
import { ModalService } from '../../services/modal.service';
import { UtilityService } from '../../services/utility.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { TerminologyServerService } from '../../services/terminologyServer.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';
import { Observable, of, Subject } from 'rxjs';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss'],
    animations: [
        trigger('slide', [
            state('start', style({ opacity: 0, transform: 'translateY(200%)'})),
            state('end', style({ opacity: 0, transform: 'translateY(-200%)'})),
            transition('start <=> end', [
                animate('2000ms ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(200%)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 0.1}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 0.8}),
                    style({opacity: 0, transform: 'translateY(-200%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class ReportingComponent implements OnInit {

    // pipe filters
    querySearch: string;

    // whitelist
    whitelistSearchTerm: string;
    @ViewChild('textareaTypeahead', { static: true }) inputElement: ElementRef;
    private searchConcepts = new Subject<string>();
    conceptList: Observable<object>;

    // item arrays
    categories: Category[];

    // active Items
    activeCategory: Category;
    activeQuery: Query;
    activeReport: Report;
    activeReportSet: Report[];

    // animations
    saved = 'start';
    saveResponse: string;

    constructor(private reportingService: ReportingService,
                private authoringService: AuthoringService,
                private modalService: ModalService,
                private terminologyService: TerminologyServerService) {
    }

    ngOnInit() {
        this.reportingService.getCategories().subscribe(data => {
            this.categories = data;
        });

        setInterval(() => this.refresh(), 5000);

        this.conceptList = this.searchConcepts.pipe(
            debounceTime(250),
            distinctUntilChanged(),
            switchMap((idList) => {
                return this.terminologyService.getConceptsById(idList);
            })
        );
    }

    refresh(): void {
        if (this.activeQuery) {
            this.reportingService.getReportRuns(this.activeQuery.name).subscribe(data => {
                if (JSON.stringify(data) !== JSON.stringify(this.activeReportSet)) {
                    this.activeReportSet = data;
                }
            });
        } else {
            this.activeReportSet = null;
        }
    }

    parameterValue(report, parameter): string {
        if (report.parameters.hasOwnProperty('parameterMap') && report.parameters.parameterMap.hasOwnProperty(parameter.key)) {
            return report.parameters.parameterMap[parameter.key].value;
        } else  {
            return '';
        }
    }

    switchActiveQuery(query): void {
        if (this.activeQuery !== query) {
            this.activeQuery = query;

            if (this.activeQuery.whiteList === undefined) {
                this.activeQuery.whiteList = [];
            }
        } else {
            this.activeQuery = null;
        }

        this.switchActiveReportSet();
    }

    parametersExistCheck(): boolean {
        for (const param in this.activeQuery.parameters['parameterMap']) {
            if (this.activeQuery.parameters['parameterMap'].hasOwnProperty(param)) {
                if (this.activeQuery.parameters['parameterMap'][param].type !== 'HIDDEN') {
                    return true;
                } else {
                    this.activeQuery.parameters['parameterMap'][param].value = this.authoringService.environmentEndpoint
                        + 'template-service';
                }
            }
        }
        return false;
    }

    switchActiveReportSet(): void {
        this.activeReportSet = null;
        this.refresh();
    }

    viewReport(report): void {
        window.open(report.resultUrl);
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    deleteReport(): void {
        this.reportingService.deleteReport(this.activeReport).subscribe(() => {
            this.refresh();
        });
    }

    submitReport(): void {
        this.reportingService.postReport(this.activeQuery).subscribe(() => {
            this.refresh();
        });
    }

    retrieveConceptsById(): void {
        let idList = [];
        if (this.whitelistSearchTerm) {
            idList = this.whitelistSearchTerm.replace(/\s/g, '').split(',');
        }

        this.terminologyService.getConceptsById(idList).subscribe(
            data => {
                // @ts-ignore
                data.items.forEach(concept => {
                   this.whitelistSearchTerm = this.whitelistSearchTerm.replace(concept.id,
                       UtilityService.convertConceptObjectToString(concept));
                });
            });
    }

    saveWhitelist(): void {
        // this takes the string entered and converts it to objects for the actual whitelist
        if (this.whitelistSearchTerm) {
            this.whitelistSearchTerm.split(',').forEach(text => {
                const concept = UtilityService.convertStringToConceptObject(text);
                let exists = false;

                // prevents duplicates being pushed
                this.activeQuery.whiteList.filter((item) => {
                    if (item.sctId === concept.sctId) {
                        exists = true;
                    }
                });

                if (!exists) {
                    this.activeQuery.whiteList.push(concept);
                }
            });

            this.whitelistSearchTerm = '';
        }

        // actually posts the whitelist doing relevant animations based on response
        this.reportingService.postWhitelist(this.activeQuery.name, this.activeQuery.whiteList).subscribe(
            () => {
                this.saveResponse = 'Saved';
                this.saved = (this.saved === 'start' ? 'end' : 'start');
            },
            () => {
                this.saveResponse = 'Error';
                this.saved = (this.saved === 'start' ? 'end' : 'start');
            });
    }

    addToSearchTerm(result): void {
        this.whitelistSearchTerm = this.appendConcept(this.whitelistSearchTerm, UtilityService.convertConceptObjectToString(result));
    }

    appendConcept(stringList, string): string {

        this.inputElement.nativeElement.focus();

        if (stringList.includes(',')) {
            return UtilityService.appendStringToStringList(stringList, string);
        } else {
            return string;
        }
    }

    removeFromWhitelist(concept): void {
        this.activeQuery.whiteList = this.activeQuery.whiteList.filter(item => {
            return item.sctId !== concept.sctId;
        });
    }
}
