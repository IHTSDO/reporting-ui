import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
    categorySearch: string;
    querySearch: string;
    activeCategoryTitle: string;

    // Item Arrays
    categories: Category[];
    activeReportSet: Report[];

    // Active Items
    activeCategory: Category;
    activeQuery: Query;


    // ------------------ New variables above
    // ------------------ Old variables below

    closeResult: string;
    parameters: string[];
    typeahead: boolean;

    constructor(private reportingService: ReportingService,
                public modalService: NgbModal) {
    }

    ngOnInit() {
        this.reportingService.getCategories().subscribe(data => {
            this.categories = data;
        });

        this.parameters = [''];
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

    // ------------------ New functions above
    // ------------------ Old functions below


    typeaheadFunc(event, i) {
        this.parameters[i] = event;
        this.typeahead = false;
    }

    submitReport() {
        let params = {};

        if (!this.activeQuery.parameterNames) {
            params = null;
        }
        else {
            for (let i = 0; i < this.activeQuery.parameterNames.length; i++) {
                params[this.activeQuery.parameterNames[i]] = this.parameters[i];
            }
        }

        this.reportingService.postReportRun(this.activeQuery.name, params).subscribe(data => {
            console.log(data);
        });
    }



    close(reason) {
        this.closeResult = reason;

        this.submitReport();

        this.modalService.dismissAll(reason);
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
