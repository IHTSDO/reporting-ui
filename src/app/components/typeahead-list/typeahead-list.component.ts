import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';
import { TerminologyServerService } from '../../services/terminologyServer.service';

@Component({
    selector: 'app-typeahead-list',
    templateUrl: './typeahead-list.component.html',
    styleUrls: ['./typeahead-list.component.scss']
})
export class TypeaheadListComponent implements OnInit {

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
                    return of({});
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

    selectConcept(result): void {
        this.searchTerms.next('');
        this.selectEmitter.emit(result);
    }
}
