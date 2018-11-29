import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedModalComponent } from './snomed-modal.component';
import { SnomedTypeaheadComponent } from '../snomed-typeahead/snomed-typeahead.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { SnomedOverlayComponent } from '../snomed-overlay/snomed-overlay.component';
import { MatCheckboxModule } from '@angular/material';

describe('SnomedModalComponent', () => {
    let component: SnomedModalComponent;
    let fixture: ComponentFixture<SnomedModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedModalComponent,
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
        fixture = TestBed.createComponent(SnomedModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
