import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Query } from '../../models/query';
import { Concept } from '../../models/concept';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/authentication.service';
import {PathingService} from '../pathing/pathing.service';
import {User} from '../../models/user';

export type ReportFilterMode = 'all' | 'mine' | 'branch';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    private reports = new Subject<any>();
    private releases = new Subject<any>();
    private activeReport = new Subject<any>();
    private runs = new Subject<any>();
    private whitelist = new Subject<any>();
    private reportFilter = new BehaviorSubject<ReportFilterMode>('all');
    private activeReleaseArchive = new Subject();
    private pagination = new BehaviorSubject(0);

    user: User;
    userSubscription: Subscription;
    localReportFilter: ReportFilterMode;
    localReportFilterSubscription: Subscription;
    activeBranch: any;
    activeBranchSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;
    activeTask: any;
    activeTaskSubscription: Subscription;
    projects: any;
    projectsSubscription: Subscription;

    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService,
                private pathingService: PathingService) {
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.localReportFilterSubscription = this.getReportFilter().subscribe(data => this.localReportFilter = data);
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.activeTaskSubscription = this.pathingService.getActiveTask().subscribe(data => this.activeTask = data);
        this.projectsSubscription = this.pathingService.getProjects().subscribe(data => this.projects = data);
    }

    // Setters & Getters: Reports
    setReports(reports) {
        this.reports.next(reports);
    }

    getReports() {
        return this.reports.asObservable();
    }

    setReleases(releases) {
        this.releases.next(releases);
    }

    getReleases() {
        return this.releases.asObservable();
    }

    // Setters & Getters: ActiveReport
    setActiveReport(report) {
        this.activeReport.next(report);
    }

    getActiveReport() {
        return this.activeReport.asObservable();
    }

    // Setters & Getters: Runs
    setRuns(runs) {
        this.runs.next(runs);
    }

    getRuns() {
        return this.runs.asObservable();
    }

    // Setters & Getters: Whitelist
    setWhitelist(whitelist) {
        this.whitelist.next(whitelist);
    }

    getWhitelist() {
        return this.whitelist.asObservable();
    }

    // Setters & Getters: ReportFilter
    setReportFilter(reportFilter: ReportFilterMode) {
        this.reportFilter.next(reportFilter);
    }

    getReportFilter() {
        return this.reportFilter.asObservable();
    }

    // Setters & Getters: ActiveReleaseArchive
    setActiveReleaseArchive(releaseArchive) {
        this.activeReleaseArchive.next(releaseArchive);
    }

    getActiveReleaseArchive() {
        return this.activeReleaseArchive.asObservable();
    }

    setPagination(page) {
        this.pagination.next(page);
    }

    getPagination() {
        return this.pagination.asObservable();
    }


    httpGetReports() {
        return this.http.get<Category[]>('/reporting-service/jobs/Report/');
    }

    private getRunsFilterParams(): string {
        switch (this.localReportFilter) {
            case 'mine':
                return '&user=' + this.user.login;
            case 'branch':
                if (this.activeProject?.key) {
                    let params = '&project=' + encodeURIComponent(this.activeProject.key);
                    if (this.activeTask?.key) {
                        params += '&task=' + encodeURIComponent(this.activeTask.key);
                    }
                    return params;
                }
                if (this.activeBranch?.branchPath) {
                    return '&branchPath=' + encodeURIComponent(this.activeBranch.branchPath);
                }
                return '';
            default:
                return '';
        }
    }

    private getProjectKeysForBranch(branchPath: string): string[] {
        return (this.projects || [])
            .filter(project => project.codeSystem?.branchPath === branchPath)
            .map(project => project.key);
    }

    private matchesBranchFilter(run: any): boolean {
        if (this.activeProject?.key) {
            if (run.project !== this.activeProject.key) {
                return false;
            }
            if (this.activeTask?.key) {
                return run.task === this.activeTask.key;
            }
            return true;
        }
        if (this.activeBranch?.branchPath) {
            const branchPath = this.activeBranch.branchPath;
            if (run.project === branchPath) {
                return true;
            }
            return this.getProjectKeysForBranch(branchPath).includes(run.project);
        }
        return true;
    }

    private filterRunsByBranch(runs: any): any {
        if (!runs?.content || this.localReportFilter !== 'branch') {
            return runs;
        }

        const content = runs.content.filter(run => this.matchesBranchFilter(run));
        return {...runs, content};
    }

    httpGetReportRuns(name, page?, size?) {
        return this.http.get('/reporting-service/jobs/Report/' + name + '/runs?page=' + (page ? page.toString() : '0') + '&size=' + (size ? size.toString() : '100') + this.getRunsFilterParams()).pipe(
            map(runs => this.filterRunsByBranch(runs))
        );
    }

    httpDeleteReport(name, id) {
        return this.http.delete('/reporting-service/jobs/Report/' + name + '/runs/' + id);
    }

    httpDeleteReports(name, ids) {
        return this.http.post('/reporting-service/jobs/Report/' + name + '/runs/delete', ids);
    }

    httpPostReport(query, codeSystemShortname, project, task?): Observable<Query> {
        const params = {
            codeSystemShortname: codeSystemShortname,
            jobName: query.name,
            project: project,
            task: task ? task : null,
            parameters: query.parameters
        };

        return this.http.post<Query>('/reporting-service/jobs/Report/' + params.jobName + '/runs', JSON.stringify(params));
    }

    httpGetWhitelist(name, codeSystemShortName): Observable<Concept[]> {
        return this.http.get<Concept[]>('/reporting-service/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist');
    }

    httpPostWhitelist(name, codeSystemShortName, params): Observable<Concept[]> {
        return this.http.post<Concept[]>('/reporting-service/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist',
            JSON.stringify(params));
    }

    httpInitialise() {
        return this.http.get('/reporting-service/jobs/initialise');
    }
}
