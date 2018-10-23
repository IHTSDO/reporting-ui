import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { Category } from '../../models/category';
import { Query } from '../../models/query';
import { Report } from '../../models/report';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

    // Pipe Filters
    categorySearch: string;
    querySearch: string;
    activeCategoryTitle: string;

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
                this.activeReportSet = data;
            });
        }
        else {
            this.activeReportSet = null;
        }
    }

    switchActiveCategory(category) {
        if (this.activeCategory !== category) {
            this.activeCategory = category;
            this.activeCategoryTitle = category.name;
        }
        else {
            this.activeCategory = null;
            this.activeCategoryTitle = null;
        }
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

        if(this.activeQuery) {
            this.reportingService.getReportSet(this.activeQuery.name).subscribe(data => {
                this.activeReportSet = data;
            });
        }
        else {
            this.activeReportSet = null;
        }
    }

    viewReport(report) {
        window.open(report.resultUrl);
    }

    submitReportRequest() {
        this.reportingService.postReport(this.activeQuery, this.activeQuery.parameterSubmissions).subscribe(data => {
            console.log(data);
            this.modalService.open = false;
        });
    }
}
