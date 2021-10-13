import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';
import {ModalService} from '../../services/modal/modal.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {PathingService} from '../../services/pathing/pathing.service';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../services/http/http.service';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {UtilityService} from '../../services/utility/utility.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
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
export class ReportComponent implements OnInit {

    saved = 'start';
    saveResponse: string;
    whitelistChanged = false;

    reports: any[];
    reportsSubscription: Subscription;
    activeReport: any;
    activeReportSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;
    runs: any;
    runsSubscription: Subscription;
    whitelist: any;
    whitelistSubscription: Subscription;

    // typeahead
    searchTerm: string;
    spinner = document.createElement('div');
    search = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        filter((text) => text.length > 2),
        distinctUntilChanged(),
        tap(() => document.activeElement.parentElement.appendChild(this.spinner)),
        switchMap(term => this.httpService.getTypeahead(term)
            .pipe(tap(() => document.getElementById('spinner').remove()))
        ),
        catchError(tap(() => document.getElementById('spinner').remove()))
    )

    constructor(private reportingService: ReportingService,
                private modalService: ModalService,
                private pathingService: PathingService,
                private httpService: HttpService) {
        this.reportsSubscription = this.reportingService.getReports().subscribe( data => this.reports = data);
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe( data => {
            this.activeReport = data;
            this.setRuns();
        });
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe( data => this.activeProject = data);
        this.runsSubscription = this.reportingService.getRuns().subscribe( data => this.runs = data);
        this.whitelistSubscription = this.reportingService.getWhitelist().subscribe( data => this.whitelist = data);
        this.spinner.id = 'spinner';
        this.spinner.classList.add('spinner-border', 'spinner-border-sm', 'position-absolute');
        this.spinner.style.top = '7px';
        this.spinner.style.right = '7px';
    }

    ngOnInit(): void {

    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    deleteReport(): void {
        this.reportingService.httpDeleteReport(this.activeReport).subscribe(() => {
            this.refresh();
        });
    }

    submitReport(): void {
        this.reportingService.httpPostReport(this.activeReport, this.getCodeSystemShortname(), this.activeProject.key).subscribe(() => {
            this.refresh();
        });
    }

    refresh(): void {
        if (this.activeReport) {
            this.reportingService.httpGetReportRuns(this.activeReport.name).subscribe(data => {
                if (JSON.stringify(data) !== JSON.stringify(this.runs)) {
                    this.runs = data;
                }
            });
        } else {
            this.runs = null;
        }
    }

    setRuns() {
        if (this.activeReport) {
            this.reportingService.httpGetReportRuns(this.activeReport.name).subscribe(runs => {
                this.reportingService.setRuns(runs);
            });
        }
    }

    convertDate(date) {
        return date.replace(/T|Z/g, ' ');
    }

    viewReport(report): void {
        window.open(report.resultUrl);
    }

    getWhitelist() {
        this.reportingService.httpGetWhitelist(this.activeReport.name, this.getCodeSystemShortname()).subscribe(data => {
            this.reportingService.setWhitelist(data);
        });
    }

    // APPROVED ^
    ////////////////////////
    // UNAPPROVED v

    getCodeSystemShortname() {
        if (this.activeProject.metadata && this.activeProject.metadata.codeSystemShortName) {
            return this.activeProject.metadata.codeSystemShortName;
        } else {
            return 'SNOMEDCT';
        }
    }

    missingFieldsCheck(): void {
        let missingFields = false;
        for (const param in this.activeReport.parameters) {
            if (this.activeReport.parameters.hasOwnProperty(param)) {
                const field = this.activeReport.parameters[param];
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
            this.httpService.getConceptsById(idList).subscribe(
                data => {
                    data['items'].forEach(concept => {
                        this.addToWhitelist(concept);
                    });
                });
        }
    }

    addToWhitelist(concept) {
        this.searchTerm = '';

        const exists = this.whitelist.find(item => {
            return item.sctId === concept.id;
        });

        if (exists === undefined) {
            this.whitelist.unshift(UtilityService.convertFullConceptToShortConcept(concept));
            this.whitelistChanged = true;
        }
    }

    saveWhitelist(): void {
        this.whitelist.forEach(item => {
            delete item.new;
        });

        this.reportingService.httpPostWhitelist(this.activeReport.name, this.getCodeSystemShortname(), this.whitelist).subscribe(
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
        this.whitelist = this.whitelist.filter(item => {
            return item.sctId !== concept.sctId;
        });
        this.whitelistChanged = true;
    }
}
