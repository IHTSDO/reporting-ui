import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from 'src/globals';

import { ConceptService } from '../../services/concept.service';

import { Query } from '../../models/query';
import { TypeaheadConcepts } from '../../models/typeaheadConcepts';


@Component({
    selector: 'app-snomed-query-modal',
    templateUrl: './snomed-query-modal.component.html',
    styleUrls: ['./snomed-query-modal.component.scss']
})
export class SnomedQueryModalComponent implements OnInit {

    @Input() query: Query;
    @Output() submitEmitter = new EventEmitter();
    @Output() closeEmitter = new EventEmitter();

    private searchTerms = new Subject<string>();
    results: Observable<TypeaheadConcepts>;

    constructor(private conceptService: ConceptService) {
    }

    ngOnInit() {
        for(let key in this.query.parameters['parameterMap']) {
            if(this.query.parameters['parameterMap'][key].type === 'BOOLEAN') {
                this.query.parameters['parameterMap'][key].value = false
            }
        }

        this.results = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => (term.length >= typeaheadMinimumLength) ? this.conceptService.getTypeaheadConcepts(term) : of(new TypeaheadConcepts()))
        );
    }

    submitReportRequest() {
        this.submitEmitter.emit();
        this.closeEmitter.emit();
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    selectConcept(result) {
        this.searchTerms.next('');
        return result.id + ' |' + result.fsn.term + '|';
    }
}
