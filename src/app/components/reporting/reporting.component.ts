import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReportingService } from '../../services/reporting/reporting.service';
import { Category } from '../../models/category';
import { Query } from '../../models/query';
import { Report } from '../../models/report';
import { AuthoringService } from '../../services/authoring/authoring.service';
import { ModalService } from '../../services/modal/modal.service';
import { UtilityService } from '../../services/utility/utility.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { TerminologyServerService } from '../../services/terminologyServer/terminologyServer.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Concept } from '../../models/concept';
import { User } from '../../models/user';
import {PathingService} from '../../services/pathing/pathing.service';

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
    activeWhitelist: Concept[];
    activeCategory: Category;
    activeQuery: Query;
    activeReport: Report;
    activeReportSet: Report[];
    private activeProject: any;
    private activeProjectSubscription: Subscription;
    private projects: any;
    private projectSubscription: Subscription;
    private user: User;
    private userSubscription: Subscription;

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
                private terminologyService: TerminologyServerService,
                private authenticationService: AuthenticationService,
                private pathingService: PathingService) {
        this.projectSubscription = this.pathingService.getProjects().subscribe(data => this.projects = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
    }

    ngOnInit(){

    }

    // ngOnInit() {
    //     this.reportingService.getCategories().subscribe(data => {
    //         this.categories = data;
    //     });
    //
    //     setInterval(() => this.refresh(), 5000);
    // }
    //
    //
    //
    // switchActiveQuery(query): void {
    //     if (this.activeQuery !== query) {
    //         this.activeQuery = query;
    //
    //         if (this.activeWhitelist === undefined) {
    //             this.activeWhitelist = [];
    //         }
    //     } else {
    //         this.activeQuery = null;
    //     }
    //
    //     this.switchActiveReportSet();
    // }
    //
    // switchActiveReportSet(): void {
    //     this.activeReportSet = null;
    //     this.refresh();
    // }
    //
    // // Query Modal Functions

}
