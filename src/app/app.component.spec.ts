import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { CategoryPipe } from './pipes/category.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ConceptsPipe } from './pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HiddenPipe } from './pipes/hidden.pipe';
import { DisplayOrderPipe } from './pipes/display-order.pipe';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { TypeaheadListComponent } from './components/typeahead-list/typeahead-list.component';
import { OrderByPipe } from './pipes/order-by.pipe';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ReportingComponent,
                SnomedNavbarComponent,
                SnomedFooterComponent,
                LeftSidebarComponent,
                CategoryPipe,
                ConceptsPipe,
                HiddenPipe,
                DisplayOrderPipe,
                TypeaheadComponent,
                TypeaheadListComponent,
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
