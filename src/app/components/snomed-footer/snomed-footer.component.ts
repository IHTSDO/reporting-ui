import { Component, OnInit, Input } from '@angular/core';
import { UIConfiguration } from 'src/app/models/uiConfiguration';

@Component({
    selector: 'app-snomed-footer',
    templateUrl: './snomed-footer.component.html',
    styleUrls: ['./snomed-footer.component.scss']
})
export class SnomedFooterComponent implements OnInit {

    @Input() uiConfiguration: UIConfiguration;
    year: number = new Date().getFullYear();

    constructor() {
    }

    ngOnInit() {
    }
}
