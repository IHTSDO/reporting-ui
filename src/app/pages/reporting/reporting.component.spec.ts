import { async, TestBed } from '@angular/core/testing';
import { ReportingComponent } from './reporting.component';
import { HttpClientModule } from '@angular/common/http';
import { SnomedLeftSidebarComponent } from '../../components/snomed-left-sidebar/snomed-left-sidebar.component';
import { CategoryPipe } from '../../pipes/category.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnomedQueryModalComponent } from '../../components/snomed-query-modal/snomed-query-modal.component';
import { FormsModule } from '@angular/forms';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HiddenPipe } from '../../pipes/hidden.pipe';
import { DisplayOrderPipe } from '../../pipes/display-order.pipe';
import { SnomedDeleteModalComponent } from '../../components/snomed-delete-modal/snomed-delete-modal.component';
import { SnomedWhitelistModalComponent } from '../../components/snomed-whitelist-modal/snomed-whitelist-modal.component';
import { SnomedTypeaheadComponent } from '../../components/snomed-typeahead/snomed-typeahead.component';
import { SnomedTypeaheadListComponent } from '../../components/snomed-typeahead-list/snomed-typeahead-list.component';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { ReportingService } from '../../services/reporting.service';

describe('ReportingComponent', () => {
    let component: ReportingComponent;
    let reportingService: ReportingService;
    // let fixture: ComponentFixture<ReportingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportingComponent,
                SnomedLeftSidebarComponent,
                CategoryPipe,
                SnomedQueryModalComponent,
                ConceptsPipe,
                HiddenPipe,
                DisplayOrderPipe,
                SnomedDeleteModalComponent,
                SnomedWhitelistModalComponent,
                SnomedTypeaheadComponent,
                SnomedTypeaheadListComponent,
                OrderByPipe
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
        reportingService = new ReportingService(null);
        component = new ReportingComponent(reportingService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
