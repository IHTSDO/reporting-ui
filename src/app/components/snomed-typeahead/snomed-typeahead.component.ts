import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/internal/operators';

import { ConceptService } from '../../services/concept.service';

import { TypeaheadConcepts } from '../../models/typeaheadConcepts';

@Component({
    selector: 'app-snomed-typeahead',
    templateUrl: './snomed-typeahead.component.html',
    styleUrls: ['./snomed-typeahead.component.scss']
})
export class SnomedTypeaheadComponent implements OnInit, OnChanges {

    @Input() input: string;
    @Output() conceptTypeaheadEmitter = new EventEmitter();
    concepts: Observable<TypeaheadConcepts>;

    private searchTerms = new Subject<string>();

    constructor(private conceptService: ConceptService) {
    }

    ngOnInit() {
        this.concepts = this.searchTerms.pipe(
            debounceTime(300),
            filter((val: string) => (val.length > 2)),
            distinctUntilChanged(),
            switchMap((term: string) => this.conceptService.getTypeaheadConcepts(term))
        );

    }

    ngOnChanges() {
        if(this.input.length > 2) {
            this.searchTerms.next(this.input);
        }
    }

    selectConcept(concept) {
        this.conceptTypeaheadEmitter.emit(concept.id + " |" + concept.fsn.term + "|");
    }
}
