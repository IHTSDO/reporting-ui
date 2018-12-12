import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingComponent } from './reporting.component';
import { HttpClientModule } from '@angular/common/http';
import { SnomedLeftSidebarComponent } from '../../components/snomed-left-sidebar/snomed-left-sidebar.component';
import { CategoryPipe } from '../../pipes/category.pipe';
import { MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { SnomedQueryModalComponent } from '../../components/snomed-query-modal/snomed-query-modal.component';
import { FormsModule } from '@angular/forms';
import { SnomedOverlayComponent } from '../../components/snomed-overlay/snomed-overlay.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';

describe('ReportingComponent', () => {
    let component: ReportingComponent;
    let fixture: ComponentFixture<ReportingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportingComponent,
                SnomedLeftSidebarComponent,
                CategoryPipe,
                SnomedQueryModalComponent,
                SnomedOverlayComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule,
                MatTooltipModule,
                FormsModule,
                MatCheckboxModule
            ],
            schemas: []
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
