import { Component, OnInit } from '@angular/core';

import { ReportingService } from '../../services/reporting.service';

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
    activeReport: Report;

    // Modal Flags
    openQueryModal = false;
    openDeleteModal = false;
    openWhitelistModal = false;

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.reportingService.getCategories().subscribe(data => {
            this.categories = data;
        });

        setInterval(() => this.refresh(), 5000);
    }

    refresh() {
        if (this.activeQuery) {
            this.reportingService.getReportSet(this.activeQuery.name).subscribe(data => {
                if (JSON.stringify(data) !== JSON.stringify(this.activeReportSet)) {
                    this.activeReportSet = data;
                }
            });
        } else {
            this.activeReportSet = null;
        }
    }

    parameterValue(report, parameter) {
        if (report.parameters.hasOwnProperty('parameterMap') && report.parameters.parameterMap.hasOwnProperty(parameter.key)) {
            return report.parameters.parameterMap[parameter.key].value;
        } else  {
            return '';
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
        } else {
            this.activeQuery = null;
        }

        this.switchActiveReportSet();
    }

    parametersExistCheck(params) {
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                if (params[param].type !== 'HIDDEN') {
                    return true;
                }
            }
        }
        return false;
    }

    switchActiveReportSet() {
        this.activeReportSet = null;
        this.refresh();
    }

    viewReport(report) {
        window.open(report.resultUrl);
    }

    deleteReport(report) {
        this.activeReport = report;
        this.openDeleteModal = true;
    }

    submitReportRequest() {
        this.reportingService.postReport(this.activeQuery).subscribe(() => {
            this.refresh();
        });
    }

    closeModal() {
        this.openQueryModal = false;
        this.openDeleteModal = false;
        this.openWhitelistModal = false;
    }
}
