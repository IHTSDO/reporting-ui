import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {ReportingService} from '../../services/reporting/reporting.service';
import {ModalService} from '../../services/modal/modal.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {PathingService} from '../../services/pathing/pathing.service';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../services/http/http.service';
import {UtilityService} from '../../services/utility/utility.service';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import { ClipboardService } from 'ngx-clipboard';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, SlicePipe, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTooltip, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { QueryParametersComponent } from '../query-parameters/query-parameters.component';
import { HiddenPipe } from '../../pipes/hidden/hidden.pipe';
import { DisplayOrderPipe } from '../../pipes/displayOrder/display-order.pipe';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    animations: [
        trigger('slide', [
            state('start', style({ opacity: 0, transform: 'translateY(200%)' })),
            state('end', style({ opacity: 0, transform: 'translateY(-200%)' })),
            transition('start <=> end', [
                animate('2000ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(200%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 0.1 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 0.8 }),
                    style({ opacity: 0, transform: 'translateY(-200%)', offset: 1.0 })
                ]))
            ])
        ])
    ],
    imports: [NgIf, FormsModule, NgFor, NgSwitch, NgSwitchCase, NgbTooltip, NgSwitchDefault, ModalComponent, QueryParametersComponent, NgbTypeahead, SlicePipe, KeyValuePipe, HiddenPipe, DisplayOrderPipe]
})
export class ReportComponent implements OnInit {

    saved = 'start';
    saveResponse: string;
    whitelistChanged = false;
    runId: string;
    deleteReports: any[] = [];

    reports: any[];
    reportsSubscription: Subscription;
    activeReport: any;
    activeReportSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;
    projects: any;
    projectsSubscription: Subscription;
    activeTask: any;
    activeTaskSubscription: Subscription;
    runs: any;
    runsSubscription: Subscription;
    whitelist: any;
    whitelistSubscription: Subscription;
    activeBranch: any;
    activeBranchSubscription: Subscription;
    user: any;
    userSubscription: Subscription;
    allReports: any;
    allReportsSubscription: Subscription;
    pagination: number;
    paginationSubscription: Subscription;


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
        ))
    )

    constructor(private reportingService: ReportingService,
                private modalService: ModalService,
                private pathingService: PathingService,
                private httpService: HttpService,
                private authoringService: AuthoringService,
                private authenticationService: AuthenticationService,
                private clipboardApi: ClipboardService) {
        this.reportsSubscription = this.reportingService.getReports().subscribe( data => this.reports = data);
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe( data => {
            this.activeReport = data;
            this.deleteReports = [];
            this.setRuns();
        });
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe( data => this.activeProject = data);
        this.projectsSubscription = this.pathingService.getProjects().subscribe( data => this.projects = data);
        this.activeTaskSubscription = this.pathingService.getActiveTask().subscribe(data => this.activeTask = data);
        this.runsSubscription = this.reportingService.getRuns().subscribe( data => this.runs = data);
        this.paginationSubscription = this.reportingService.getPagination().subscribe( data => this.pagination = data);
        this.whitelistSubscription = this.reportingService.getWhitelist().subscribe( data => this.whitelist = data);
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.allReportsSubscription = this.reportingService.getAllReports().subscribe(data => this.allReports = data);
        this.spinner.id = 'spinner';
        this.spinner.classList.add('spinner-border', 'spinner-border-sm', 'position-absolute');
        this.spinner.style.top = '7px';
        this.spinner.style.right = '7px';
    }

    ngOnInit() {
        setInterval(() => this.refresh(), 5000);
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    deleteReport(): void {
        this.reportingService.httpDeleteReport(this.activeReport.name, this.runId).subscribe(() => {
            this.refresh();
        });
    }

    submitReport(): void {
        this.reportingService.httpPostReport(this.activeReport, this.getCodeSystemShortname(), this.activeProject ? this.activeProject.key : this.activeBranch.branchPath, this.activeTask ? this.activeTask.key : null).subscribe(() => {
            this.refresh();
        });
    }

    refresh(): void {
        if (this.activeReport) {
            this.reportingService.httpGetReportRuns(this.activeReport.name, 0, (this.pagination + 1) * 100).subscribe(runs => {
                if (JSON.stringify(runs) !== JSON.stringify(this.runs?.content)) {
                    this.reportingService.setRuns(runs);
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

    viewReport(e, report): void {
        e.stopPropagation();
        window.open(report.resultUrl);
    }

    getWhitelist() {
        this.reportingService.httpGetWhitelist(this.activeReport.name, this.getCodeSystemShortname()).subscribe(data => {
            this.reportingService.setWhitelist(data);
        });
    }

    getCodeSystemShortname() {
        if (this.activeProject && this.activeProject.metadata && this.activeProject.metadata.codeSystemShortName) {
            return this.activeProject.metadata.codeSystemShortName;
        } else {
            return 'SNOMEDCT';
        }
    }

    validationCheck(): void {
        let validationCheck = true;
        for (const param in this.activeReport.parameters) {
            if (this.activeReport.parameters.hasOwnProperty(param)) {
                const field = this.activeReport.parameters[param];
                if (field.mandatory && (field.type !== 'BOOLEAN')) {
                    if (field.value === '' || field.value === null || field.value === undefined) {
                        validationCheck = false;
                    }
                }

                if (field.value === ' ') {
                    validationCheck = false;
                }

                if (field.type === 'CHECKBOXES') {
                    const results = [];

                    field.values.forEach( (item, i) => {
                        if (item) {
                            results.push(field.options[i]);
                        }
                    });

                    field.values = results;
                }
            }
        }

        if (validationCheck) {
            this.submitReport();
            this.closeModal('query-modal');
        } else {
            this.saveResponse = 'Invalid Input Fields';
            this.saved = (this.saved === 'start' ? 'end' : 'start');
        }
    }

    retrieveConceptsById(input): void {
        let idList = [];
        if (input) {
            idList = input.match(/[0-9]{4,18}/g);
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

    parametersExistCheck(): boolean {
        for (const param in this.activeReport.parameters) {
            if (this.activeReport.parameters.hasOwnProperty(param)) {
                if (this.activeReport.parameters[param].type !== 'HIDDEN') {
                    return true;
                } else {
                    this.activeReport.parameters[param].value = this.authoringService.environmentEndpoint + 'template-service';
                }
            }
        }
        return false;
    }

    addToWhitelist(concept) {
        this.searchTerm = '';

        // const exists = this.whitelist.find(item => {
        //     return item.sctId === concept.id;
        // });

        if (!this.whitelist.find(item => item.sctId === concept.id)) {
            this.whitelist.unshift(UtilityService.convertFullConceptToShortConcept(concept));
            this.reportingService.setWhitelist(this.whitelist);
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
        this.reportingService.setWhitelist(this.whitelist.filter(item => {
            return item.sctId !== concept.sctId;
        }));
        this.whitelistChanged = true;
    }

    addToDeleteReports(run) {
        if (!this.deleteReports.includes(run.id)) {
            this.deleteReports.push(run.id);
        } else {
            this.deleteReports = this.deleteReports.filter(item => item !== run.id);
        }
    }

    bulkDeleteReports() {
        this.reportingService.httpDeleteReports(this.activeReport.name, this.deleteReports).subscribe(success => {
            this.reportingService.setRuns(success);
        }, error => {
            console.log('error: ', error);
        });
    }

    clearDeleteReports() {
        this.deleteReports = [];
    }

    toBeDeleted(run) {
        if (this.deleteReports.includes(run.id)) {
            return true;
        } else {
            return false;
        }
    }

    getTime(input): string {
        const hours = new Date(input * 1000).toISOString().substr(11, 2);
        const minutes = new Date(input * 1000).toISOString().substr(14, 2);
        const seconds = new Date(input * 1000).toISOString().substr(17, 2);
        let output = '';

        if (hours !== '00') {
            output += hours + 'h ';
        }

        if (minutes !== '00') {
            output += minutes + 'm ';
        }

        return output += seconds + 's';
    }

    setAllReports(event) {
        this.reportingService.setAllReports(event);
        this.setRuns();
    }

    copyText(content) {
        this.clipboardApi.copyFromContent(content);
    }

    loadMore() {
        this.pagination++;
        this.reportingService.setPagination(this.pagination);

        this.reportingService.httpGetReportRuns(this.activeReport.name, this.pagination).subscribe((runs: any) => {
            this.runs.content = [...this.runs.content, ...runs?.content];
            this.reportingService.setRuns(this.runs);
        });
    }
}
