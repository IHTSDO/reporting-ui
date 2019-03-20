import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { WhitelistService } from '../../services/whitelist.service';
import { Concept } from '../../models/concept';
import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-whitelist-modal',
    templateUrl: './snomed-whitelist-modal.component.html',
    styleUrls: ['./snomed-whitelist-modal.component.scss']
})
export class SnomedWhitelistModalComponent implements OnInit {

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
        this.whitelistService.postWhitelist(this.query.name, this.whitelist).subscribe();
    }

    removeFromWhitelist(concept) {
        this.whitelist = this.whitelist.filter(item => {
            return item.sctId !== concept.sctId;
        });
    }
}
