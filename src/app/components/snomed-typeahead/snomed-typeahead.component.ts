import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';
import { Observable, of, Subject } from 'rxjs';
import { TypeaheadConcepts } from '../../models/typeaheadConcepts';
import { ConceptService } from '../../services/concept.service';

@Component({
    selector: 'app-snomed-typeahead',
    templateUrl: './snomed-typeahead.component.html',
    styleUrls: ['./snomed-typeahead.component.scss']
})
export class SnomedTypeaheadComponent implements OnInit {

    term: string;

    @Input() activeFilter = true;
    @Input() set searchTerm(value: string) {
        this.term = value;
        this.search(this.term);
    }
    @Output() selectEmitter = new EventEmitter();

    private searchTerms = new Subject<string>();
    results: Observable<TypeaheadConcepts>;

    constructor(private conceptService: ConceptService) {
    }

    ngOnInit() {
        this.results = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                if (term.length >= typeaheadMinimumLength) {
                    return this.conceptService.getTypeaheadConcepts(term, this.activeFilter);
                } else {
                    return of(new TypeaheadConcepts());
                }
            })
        );
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    selectConcept(result) {
        this.searchTerms.next('');
        this.selectEmitter.emit(result);
    }
}
