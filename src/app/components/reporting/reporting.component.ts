import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from '../../services/authentication.service';
import { ProjectService } from '../../services/project.service';

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
export class ReportingComponent implements OnInit, OnDestroy {

    // Config
    @Input() managedServiceUser: boolean;

    // pipe filters
    querySearch: string;

    // whitelist
    @ViewChild('textareaTypeahead', { static: true }) inputElement: ElementRef;
    whitelistChanged = false;

    // item arrays
    categories: Category[];

    // active Items
    activeCategory: Category;
    activeQuery: Query;
    activeReport: Report;
    activeReportSet: Report[];
    private activeProject: Project;
    private activeProjectSubscription: Subscription;

    // animations
    saved = 'start';
    saveResponse: string;

    // subcription
    subscribe: Subscription;

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
                private terminologyService: TerminologyServerService,
                private authenticationService: AuthenticationService,
                private projectService: ProjectService) {
        this.activeProjectSubscription = this.projectService.getActiveProject().subscribe(data => this.activeProject = data);
    }

    ngOnInit() {
        this.reportingService.getCategories().subscribe(data => {
            this.categories = data;
        });

        setInterval(() => this.refresh(), 5000);
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
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
        if (this.activeQuery) {
            for (const param in this.activeQuery.parameters) {
                if (param === 'Project') {
                    this.activeQuery.parameters[param].value = this.activeProject.key;
                }
            }
        }

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
                if (this.activeQuery.parameters[param].type !== 'HIDDEN' && this.activeQuery.parameters[param].type !== 'PROJECT') {
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
            idList = input.match(/[0-9]{4,16}/g);
        }

        if (idList && idList.length > 0) {
            this.terminologyService.getConceptsById(idList).subscribe(
                data => {
                    data['items'].forEach(concept => {
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
            this.activeQuery.whiteList.unshift(UtilityService.convertFullConceptToShortConcept(concept));
            this.whitelistChanged = true;
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
                this.whitelistChanged = false;
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
        this.whitelistChanged = true;
    }
}
