import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Concept } from '../../models/concept';
import { Query } from '../../models/query';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { UtilityService } from '../../services/utility.service';
import { ReportingService } from '../../services/reporting.service';

@Component({
    selector: 'app-snomed-whitelist-modal',
    templateUrl: './snomed-whitelist-modal.component.html',
    styleUrls: ['./snomed-whitelist-modal.component.scss'],
    animations: [
        trigger('slide', [
            state('start', style({ opacity: 0, transform: 'translateY(200%)'})),
            state('end', style({ opacity: 0, transform: 'translateY(-200%)'})),
            transition('start <=> end', [
                animate('2000ms ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(200%)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 0.1}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 0.8}),
                    style({opacity: 0, transform: 'translateY(-200%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class SnomedWhitelistModalComponent implements OnInit {

    saved = 'start';
    saveResponse: string;
    searchTerm = '';
    whitelist: Concept[] = [];

    @Input() query: Query;
    @Output() closeEmitter = new EventEmitter();

    @ViewChild('textareaTypeahead') inputElement: ElementRef;

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.reportingService.getWhitelist(this.query.name).subscribe(data => {
            this.whitelist = data;
        });
    }

    addToSearchTerm(result) {
        this.searchTerm = this.appendConcept(this.searchTerm, UtilityService.convertConceptObjectToString(result));
    }

    appendConcept(stringList, string) {

        this.inputElement.nativeElement.focus();

        if (stringList.includes(',')) {
            return UtilityService.appendStringToStringList(stringList, string);
        } else {
            return string;
        }
    }

    saveWhitelist() {
        if (this.searchTerm) {
            this.searchTerm.split(',').forEach(item => {
                this.whitelist.push(UtilityService.convertStringToConceptObject(item));
            });

            this.searchTerm = '';
        }
        this.reportingService.postWhitelist(this.query.name, this.whitelist).subscribe(
            () => {
                this.saveAnimation(true);
            },
            () => {
                this.saveAnimation(false);
            });
    }

    saveAnimation (success) {
        this.saveResponse = success ? 'Saved' : 'Error';
        this.saved = (this.saved === 'start' ? 'end' : 'start');
    }

    removeFromWhitelist(concept) {
        this.whitelist = this.whitelist.filter(item => {
            return item.sctId !== concept.sctId;
        });
    }
}
