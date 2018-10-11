import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ConceptService } from '../../services/concept.service';

@Component({
    selector: 'app-snomed-typeahead',
    templateUrl: './snomed-typeahead.component.html',
    styleUrls: ['./snomed-typeahead.component.scss']
})
export class SnomedTypeaheadComponent implements OnInit, OnChanges {

    @Input() input: string;
    @Output() conceptTypeaheadEmitter = new EventEmitter();
    concepts: any;

    constructor(private conceptService: ConceptService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if(this.input.length > 2) {
            this.conceptService.getTypeaheadConcepts(this.input).subscribe(data => {
                if(this.input.length > 2) {
                    this.concepts = data;
                } else {
                    this.concepts = [];
                }
            });
        } else {
            this.concepts = [];
        }
    }

    selectConcept(concept) {
        this.conceptTypeaheadEmitter.emit(concept.fsn.term);
    }
}
