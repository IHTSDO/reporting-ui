import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WhitelistService } from '../../services/whitelist.service';
import { Concept } from '../../models/concept';
import { Query } from '../../models/query';

@Component({
    selector: 'app-snomed-whitelist-modal',
    templateUrl: './snomed-whitelist-modal.component.html',
    styleUrls: ['./snomed-whitelist-modal.component.scss']
})
export class SnomedWhitelistModalComponent implements OnInit {

    searchTerm: string = '';
    whitelist: Concept[] = [];

    @Input() query: Query;
    @Output() closeEmitter = new EventEmitter();

    constructor(private whitelistService: WhitelistService) {
    }

    ngOnInit() {
        this.whitelistService.getWhitelist(this.query.name).subscribe(data => {
            this.whitelist = data;
        });
    }

    addToWhitelist(result) {
        this.whitelist.push(this.convertTypeaheadToConcept(result));
        this.searchTerm = '';
    }

    convertTypeaheadToConcept(result) {
        return { sctId: result.id, fsn: result.fsn.term };
    }

    removeFromWhitelist(concept) {
        this.whitelist = this.whitelist.filter(item => {
            return item.sctId != concept.sctId
        });
    }

    saveWhitelist() {
        this.whitelistService.postWhitelist(this.query.name, this.whitelist).subscribe(() => {
            this.closeEmitter.emit();
        })
    }
}
