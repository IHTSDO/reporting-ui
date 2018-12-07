import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedQueryModalComponent } from './snomed-query-modal.component';
import { SnomedTypeaheadComponent } from '../snomed-typeahead/snomed-typeahead.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { SnomedOverlayComponent } from '../snomed-overlay/snomed-overlay.component';
import { MatCheckboxModule } from '@angular/material';

describe('SnomedQueryModalComponent', () => {
    let component: SnomedQueryModalComponent;
    let fixture: ComponentFixture<SnomedQueryModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedQueryModalComponent,
                SnomedTypeaheadComponent,
                ConceptsPipe,
                SnomedOverlayComponent
            ],
            imports: [
                HttpClientModule,
                FormsModule,
                MatCheckboxModule
            ],
            schemas: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedQueryModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
