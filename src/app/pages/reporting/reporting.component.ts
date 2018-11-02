import { Component, OnInit } from '@angular/core';

import { ReportingService } from '../../services/reporting.service';

import { ModalService } from '../../services/modal.service';
import { Category } from '../../models/category';
import { Query } from '../../models/query';
import { Report } from '../../models/report';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

    // Pipe Filters
    querySearch: string;

    // Item Arrays
    categories: Category[];
    activeReportSet: Report[];

    // Active Items
    activeCategory: Category;
    activeQuery: Query;

    constructor(private reportingService: ReportingService,
                public modalService: ModalService) {
    }

    ngOnInit() {
        this.reportingService.getCategories().subscribe(data => {
            this.categories = data;
        });

        setInterval(() => this.refresh(), 5000);
    }

    refresh() {
        if(this.activeQuery) {
            this.reportingService.getReportSet(this.activeQuery.name).subscribe(data => {
                if(JSON.stringify(data) !== JSON.stringify(this.activeReportSet)) {
                    this.activeReportSet = data;
                }
            });
        }
        else {
            this.activeReportSet = null;
        }
    }

    setText(event) {
        this.querySearch = event;
    }

    setCategory(event) {
        this.activeCategory = event;
    }

    switchActiveQuery(query) {
        if (this.activeQuery !== query) {
            this.activeQuery = query;
        }
        else {
            this.activeQuery = null;
        }

        this.switchActiveReportSet();
    }

    switchActiveReportSet() {
        this.activeReportSet = null;
        this.refresh();
    }

    viewReport(report) {
        window.open(report.resultUrl);
    }

    deleteReport(report) {
        this.reportingService.postDeleteReport(report).subscribe(() => {
            this.refresh();
        });
    }

    submitReportRequest() {
        this.reportingService.postReport(this.activeQuery, this.activeQuery.parameterSubmissions).subscribe(() => {
            this.modalService.open = false;
        });
    }
}
