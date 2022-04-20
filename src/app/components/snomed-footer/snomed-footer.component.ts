import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthoringService} from '../../services/authoring/authoring.service';

@Component({
    selector: 'app-snomed-footer',
    templateUrl: './snomed-footer.component.html',
    styleUrls: ['./snomed-footer.component.scss']
})
export class SnomedFooterComponent {

    year: number = new Date().getFullYear();

    uiConfiguration: any;
    uiConfigurationSubscription: Subscription;

    constructor(private authoringService: AuthoringService) {
        this.uiConfigurationSubscription = this.authoringService.getUIConfiguration().subscribe( data => this.uiConfiguration = data);
    }
}
