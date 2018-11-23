import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';

import { SnomedTypeaheadComponent } from './snomed-typeahead.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';

describe('SnomedTypeaheadComponent', () => {
    let component: SnomedTypeaheadComponent;
    let fixture: ComponentFixture<SnomedTypeaheadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedTypeaheadComponent,
                ConceptsPipe
            ],
            imports: [HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedTypeaheadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
