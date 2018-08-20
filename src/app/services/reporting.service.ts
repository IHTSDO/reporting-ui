import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    private reports = new Subject<Report[]>();


    constructor(private http: HttpClient) {
    }

    getReports() {
        this.http.get<Report[]>(`assets/fake-data/reports.json`).subscribe(result => {
            this.reports.next(result);
        });
    }

    fetchReports(): Observable<any> {
        return this.reports.asObservable();
    }
}
