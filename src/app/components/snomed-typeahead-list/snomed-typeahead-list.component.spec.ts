import { async, TestBed } from '@angular/core/testing';
import { SnomedTypeaheadListComponent } from './snomed-typeahead-list.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ConceptService } from '../../services/concept.service';

describe('SnomedTypeaheadListComponent', () => {
    let component: SnomedTypeaheadListComponent;
    let conceptService: ConceptService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedTypeaheadListComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        conceptService = new ConceptService(null);
        component = new SnomedTypeaheadListComponent(conceptService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
