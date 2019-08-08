import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';
import { TerminologyServerService } from '../../services/terminologyServer.service';

@Component({
    selector: 'app-snomed-typeahead-list',
    templateUrl: './snomed-typeahead-list.component.html',
    styleUrls: ['./snomed-typeahead-list.component.scss']
})
export class SnomedTypeaheadListComponent implements OnInit {

    term: string;

    @Input() set searchTerm(value: string) {
        this.term = value;
        this.search(this.term);
    }
    @Output() selectEmitter = new EventEmitter();

    private searchTerms = new Subject<string>();
    results: Observable<object>;

    constructor(private terminologyServerService: TerminologyServerService) {
    }

    ngOnInit() {
        this.results = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                if (term.length >= typeaheadMinimumLength) {
                    return this.terminologyServerService.getTypeaheadConcepts(term);
                } else {
                    return of(new Object());
                }
            })
        );
    }

    search(term: string): void {
        if (term && term.includes(',')) {
            term = term.trim();
            term.indexOf(',');
            term = term.slice(term.lastIndexOf(',') + 1);
        }

        this.searchTerms.next(term);
    }

    selectConcept(result) {
        this.searchTerms.next('');
        this.selectEmitter.emit(result);
    }
}
