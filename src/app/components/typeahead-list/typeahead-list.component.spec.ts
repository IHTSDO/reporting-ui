import { async, TestBed } from '@angular/core/testing';
import { TypeaheadListComponent } from './snomed-typeahead-list.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ConceptService } from '../../services/concept.service';

describe('SnomedTypeaheadListComponent', () => {
    let component: TypeaheadListComponent;
    let conceptService: ConceptService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TypeaheadListComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        conceptService = new ConceptService(null);
        component = new TypeaheadListComponent(conceptService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
