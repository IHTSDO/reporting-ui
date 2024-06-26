import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Report } from '../../models/report';
import { Query } from '../../models/query';
import { Concept } from '../../models/concept';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    private reports = new Subject<any>();
    private releases = new Subject<any>();
    private activeReport = new Subject<any>();
    private runs = new Subject<any>();
    private whitelist = new Subject<any>();
    private allReports = new BehaviorSubject<any>(true);
    private activeReleaseArchive = new Subject();
    private pagination = new BehaviorSubject(0);

    user: User;
    userSubscription: Subscription;
    localAllReports: any;
    localAllReportsSubscription: Subscription;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.localAllReportsSubscription = this.getAllReports().subscribe(data => this.localAllReports = data);
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

    // Setters & Getters: AllReports
    setAllReports(allReports) {
        this.allReports.next(allReports);
    }

    getAllReports() {
        return this.allReports.asObservable();
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
        return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    }

    httpGetReleases() {
        return this.http.get<Object[]>('/schedule-manager/releases');
    }

    httpGetReportRuns(name, page?, size?) {
        return this.http.get('/schedule-manager/jobs/Report/' + name + '/runs?page=' + (page ? page.toString() : '0') + '&size=' + (size ? size.toString() : '100') + (this.localAllReports ? '' : '&user=' + this.user.login));
    }

    httpDeleteReport(name, id) {
        return this.http.delete('/schedule-manager/jobs/Report/' + name + '/runs/' + id);
    }

    httpDeleteReports(name, ids) {
        return this.http.post('/schedule-manager/jobs/Report/' + name + '/runs/delete', ids);
    }

    httpPostReport(query, codeSystemShortname, project, task?): Observable<Query> {
        const params = {
            codeSystemShortname: codeSystemShortname,
            jobName: query.name,
            project: project,
            task: task ? task : null,
            parameters: query.parameters
        };

        return this.http.post<Query>('/schedule-manager/jobs/Report/' + params.jobName + '/runs', JSON.stringify(params));
    }

    httpGetWhitelist(name, codeSystemShortName): Observable<Concept[]> {
        return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist');
    }

    httpPostWhitelist(name, codeSystemShortName, params): Observable<Concept[]> {
        return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist',
            JSON.stringify(params));
    }

    httpInitialise() {
        return this.http.get('/schedule-manager/jobs/initialise');
    }
}
