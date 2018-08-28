import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    public reports = new Subject<Report[]>();

    constructor() {
    }

    getReports(): Observable<Report[]> {
        return this.reports.asObservable();
    }
}
