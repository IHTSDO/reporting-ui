import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-modal',
    templateUrl: './snomed-modal.component.html',
    styleUrls: ['./snomed-modal.component.scss']
})
export class SnomedModalComponent implements OnInit {

    @Input() query: Query;
    inputs: string[] = [''];

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }

    submitReportRequest() {
        console.log(this.inputs);

        this.modalService.postReport_alt(this.query, this.inputs).subscribe(data =>{
            console.log(data);
        });
    }
}
