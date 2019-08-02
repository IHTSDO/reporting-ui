import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { SnomedLeftSidebarComponent } from './components/snomed-left-sidebar/snomed-left-sidebar.component';
import { CategoryPipe } from './pipes/category.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnomedQueryModalComponent } from './components/snomed-query-modal/snomed-query-modal.component';
import { FormsModule } from '@angular/forms';
import { ConceptsPipe } from './pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HiddenPipe } from './pipes/hidden.pipe';
import { DisplayOrderPipe } from './pipes/display-order.pipe';
import { SnomedDeleteModalComponent } from './components/snomed-delete-modal/snomed-delete-modal.component';
import { SnomedWhitelistModalComponent } from './components/snomed-whitelist-modal/snomed-whitelist-modal.component';
import { SnomedTypeaheadComponent } from './components/snomed-typeahead/snomed-typeahead.component';
import { SnomedTypeaheadListComponent } from './components/snomed-typeahead-list/snomed-typeahead-list.component';
import { OrderByPipe } from './pipes/order-by.pipe';

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
                HiddenPipe,
                DisplayOrderPipe,
                SnomedDeleteModalComponent,
                SnomedWhitelistModalComponent,
                SnomedTypeaheadComponent,
                SnomedTypeaheadListComponent,
                OrderByPipe
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
