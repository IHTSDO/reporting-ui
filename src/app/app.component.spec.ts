import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { SnomedLeftSidebarComponent } from './components/snomed-left-sidebar/snomed-left-sidebar.component';
import { CategoryPipe } from './pipes/category.pipe';
import { MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { SnomedQueryModalComponent } from './components/snomed-query-modal/snomed-query-modal.component';
import { FormsModule } from '@angular/forms';
import { SnomedOverlayComponent } from './components/snomed-overlay/snomed-overlay.component';
import { ConceptsPipe } from './pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ReportingComponent,
                SnomedNavbarComponent,
                SnomedFooterComponent,
                SnomedLeftSidebarComponent,
                CategoryPipe,
                ConceptsPipe,
                SnomedQueryModalComponent,
                SnomedOverlayComponent
            ],
            imports: [
                MatTooltipModule,
                MatCheckboxModule,
                FormsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
