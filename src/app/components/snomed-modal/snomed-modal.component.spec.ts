import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedModalComponent } from './snomed-modal.component';
import { SnomedTypeaheadComponent } from '../snomed-typeahead/snomed-typeahead.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConceptsPipe } from '../../pipes/concepts.pipe';

describe('SnomedModalComponent', () => {
    let component: SnomedModalComponent;
    let fixture: ComponentFixture<SnomedModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedModalComponent,
                SnomedTypeaheadComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule,
                FormsModule
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
