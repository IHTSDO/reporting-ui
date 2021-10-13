import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Report } from '../../models/report';
import { Query } from '../../models/query';
import { Concept } from '../../models/concept';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    private reports = new Subject<any>();
    private activeReport = new Subject<any>();
    private runs = new Subject<any>();
    private whitelist = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    // Setters & Getters: Reports
    setReports(reports) {
        this.reports.next(reports);
    }

    getReports() {
        return this.reports.asObservable();
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

    // Setters & Getters: Runs
    setWhitelist(whitelist) {
        this.whitelist.next(whitelist);
    }

    getWhitelist() {
        return this.whitelist.asObservable();
    }

    httpGetReports() {
        return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    }

    httpGetReportRuns(name) {
        return this.http.get<Report[]>('/schedule-manager/jobs/Report/' + name + '/runs');
    }

    httpDeleteReport(params) {
        return this.http.delete('/schedule-manager/jobs/Report/' + params.jobName + '/runs/' + params.id);
    }

    httpPostReport(query, codeSystemShortname, project): Observable<Query> {
        const params = {
            codeSystemShortname: codeSystemShortname,
            jobName: query.name,
            project: project,
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

    // // CATEGORIES ENDPOINTS
    // getCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>('/schedule-manager/jobs/Report/');
    // }

    // // WHITELIST ENDPOINTS
    // getWhitelist(name, codeSystemShortName): Observable<Concept[]> {
    //     return this.http.get<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist');
    // }
    //
    // postWhitelist(name, codeSystemShortName, params): Observable<Concept[]> {
    //     return this.http.post<Concept[]>('/schedule-manager/jobs/Report/' + name + '/' + codeSystemShortName + '/whitelist',
    //         JSON.stringify(params));
    // }
}
