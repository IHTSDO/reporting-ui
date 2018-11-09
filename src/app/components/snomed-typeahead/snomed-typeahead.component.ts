import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';

import { ConceptService } from '../../services/concept.service';

@Component({
    selector: 'app-snomed-typeahead',
    templateUrl: './snomed-typeahead.component.html',
    styleUrls: ['./snomed-typeahead.component.scss']
})
export class SnomedTypeaheadComponent implements OnInit, OnChanges {

    @Input() input: string;
    @Output() conceptTypeaheadEmitter = new EventEmitter();
    concepts: Observable<any>;

    @Input() active: boolean;
    isHidden: boolean;

    minLength: number = 2;
    private searchTerms = new Subject<string>();

    constructor(private conceptService: ConceptService) {
    }

    ngOnInit() {
        this.concepts = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => (term.length > this.minLength) ? this.conceptService.getTypeaheadConcepts(term) : of({}))
        );
    }

    ngOnChanges() {
        if(this.input.length > this.minLength) {
            this.searchTerms.next(this.input);
            this.isHidden = false;
        }
        else {
            this.isHidden = true;
        }
    }

    selectConcept(concept) {
        this.conceptTypeaheadEmitter.emit(concept.id + " |" + concept.fsn.term + "|");
        this.active = false;
    }
}
