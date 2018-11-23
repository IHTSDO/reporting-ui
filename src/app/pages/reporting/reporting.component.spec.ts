import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingComponent } from './reporting.component';
import { HttpClientModule } from '@angular/common/http';
import { SnomedLeftSidebarComponent } from '../../components/snomed-left-sidebar/snomed-left-sidebar.component';
import { CategoryPipe } from '../../pipes/category.pipe';
import { MatTooltipModule } from '@angular/material';
import { SnomedModalComponent } from '../../components/snomed-modal/snomed-modal.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ReportingComponent', () => {
    let component: ReportingComponent;
    let fixture: ComponentFixture<ReportingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportingComponent,
                SnomedLeftSidebarComponent,
                CategoryPipe,
                SnomedModalComponent
            ],
            imports: [
                HttpClientModule,
                MatTooltipModule,
                FormsModule
            ],
            schemas: [
                // NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
