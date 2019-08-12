import { Component, OnInit } from '@angular/core';
import { AuthoringService } from '../../services/authoring.service';
import jQuery from 'jQuery';

@Component({
    selector: 'app-snomed-footer',
    templateUrl: './snomed-footer.component.html',
    styleUrls: ['./snomed-footer.component.scss']
})
export class SnomedFooterComponent implements OnInit {

    year: number = new Date().getFullYear();

    constructor(private authoringService: AuthoringService) {
    }

    ngOnInit() {
    }

    issueCollector(e) {
        console.log('JIRA Issue Collector');

        jQuery.ajax({
            url: this.authoringService.uiConfiguration.endpoints.collectorEndpoint,
            type: 'get',
            cache: true,
            dataType: 'script'
        });

        // @ts-ignore
        window.ATL_JQ_PAGE_PROPS =  {
            'triggerFunction': function(showCollectorDialog) {
                e.preventDefault();
                showCollectorDialog();
            }};
    }
}
