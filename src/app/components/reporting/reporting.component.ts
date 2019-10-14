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
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Concept } from '../../models/concept';

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
    @ViewChild('textareaTypeahead', { static: true }) inputElement: ElementRef;

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

    // typeahead
    searchTerm: string;
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => term.length < 2 ? []
                : this.terminologyService.getTypeahead(term))
        )

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

    switchActiveReportSet(): void {
        this.activeReportSet = null;
        this.refresh();
    }

    convertDate(date) {
        return date.replace(/T|Z/g, ' ');
    }

    viewReport(report): void {
        window.open(report.resultUrl);
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

    // Modal Functions
    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    // Query Modal Functions
    parametersExistCheck(): boolean {
        for (const param in this.activeQuery.parameters) {
            if (this.activeQuery.parameters.hasOwnProperty(param)) {
                if (this.activeQuery.parameters[param].type !== 'HIDDEN') {
                    return true;
                } else {
                    this.activeQuery.parameters[param].value = this.authoringService.environmentEndpoint + 'template-service';
                }
            }
        }
        return false;
    }

    missingFieldsCheck(): void {
        let missingFields = false;
        for (const param in this.activeQuery.parameters) {
            if (this.activeQuery.parameters.hasOwnProperty(param)) {
                const field = this.activeQuery.parameters[param];
                if (field.mandatory && (field.type !== 'BOOLEAN')) {
                    if (field.value === '' || field.value === null || field.value === undefined) {
                        missingFields = true;
                    }
                }
            }
        }

        if (missingFields) {
            this.saveResponse = 'Missing Fields';
            this.saved = (this.saved === 'start' ? 'end' : 'start');
        } else {
            this.submitReport();
            this.closeModal('query-modal');
        }
    }

    // Whitelist Modal Functions
    retrieveConceptsById(input): void {
        let idList = [];
        if (input) {
            idList = input.replace(/[^0-9,]/g, '').split(',');
        }

        if (idList.length > 0) {
            this.terminologyService.getConceptsById(idList).subscribe(
                data => {
                    // @ts-ignore
                    data.items.forEach(concept => {
                        // this.addToWhitelistReadyConcepts(concept);
                        this.addToWhitelist(concept);
                    });
                });
        }
    }

    addToWhitelist(concept) {
        this.searchTerm = '';

        const exists = this.activeQuery.whiteList.find(item => {
            return item.sctId === concept.id;
        });

        if (exists === undefined) {
            this.activeQuery.whiteList.push(UtilityService.convertFullConceptToShortConcept(concept));
        }
    }

    saveWhitelist(): void {
        this.activeQuery.whiteList.forEach(item => {
            delete item.new;
        });

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

    removeFromWhitelist(concept): void {
        this.activeQuery.whiteList = this.activeQuery.whiteList.filter(item => {
            return item.sctId !== concept.sctId;
        });
    }
}
