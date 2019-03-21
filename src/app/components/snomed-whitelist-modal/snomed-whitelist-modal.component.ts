import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { WhitelistService } from '../../services/whitelist.service';
import { Concept } from '../../models/concept';
import { Query } from '../../models/query';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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

    constructor(private whitelistService: WhitelistService) {
    }

    static convertTypeaheadObjectToString(input) {
        return input.id + ' |' + input.fsn.term + '|';
    }

    static convertStringToConceptObject(input) {
        input = input.trim();

        const sctId = Number(input.match(/\d+/)[0]);
        const fsn = input.slice(input.indexOf('|') + 1, input.lastIndexOf('|'));

        return { sctId: sctId, fsn: fsn};
    }

    ngOnInit() {
        this.whitelistService.getWhitelist(this.query.name).subscribe(data => {
            this.whitelist = data;
        });
    }

    addToSearchTerm(result) {
        this.searchTerm = this.appendConcept(SnomedWhitelistModalComponent.convertTypeaheadObjectToString(result));
    }

    appendConcept(result) {

        this.inputElement.nativeElement.focus();

        if (this.searchTerm.includes(',')) {
            return this.searchTerm.slice(0, this.searchTerm.lastIndexOf(',')) + ', ' + result;
        } else {
            return result;
        }
    }

    saveWhitelist() {
        if (this.searchTerm) {
            this.searchTerm.split(',').forEach(item => {
                this.whitelist.push(SnomedWhitelistModalComponent.convertStringToConceptObject(item));
            });

            this.searchTerm = '';
        }
        this.whitelistService.postWhitelist(this.query.name, this.whitelist).subscribe(
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
