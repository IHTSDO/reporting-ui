import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { typeaheadMinimumLength } from '../../../globals';
import { Observable, of, Subject } from 'rxjs';
import { TerminologyServerService } from '../../services/terminologyServer.service';

@Component({
    selector: 'app-typeaheadv2',
    templateUrl: './typeaheadv2.component.html',
    styleUrls: ['./typeaheadv2.component.scss']
})
export class Typeaheadv2Component implements OnInit {

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
        this.searchTerms.next(term);
    }

    selectConcept(result): void {
        this.searchTerms.next('');
        this.selectEmitter.emit(result);
    }
}
