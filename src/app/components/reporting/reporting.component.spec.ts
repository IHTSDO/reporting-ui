import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryPipe } from '../../pipes/category.pipe';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { TagsPipe } from '../../pipes/tags.pipe';
import { HiddenPipe } from '../../pipes/hidden.pipe';
import { DisplayOrderPipe } from '../../pipes/display-order.pipe';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { ModalComponent } from '../modal/modal.component';
import { QueryParametersComponent } from '../query-parameters/query-parameters.component';

import { ReportingComponent } from './reporting.component';
import {ProjectMatcherPipe} from '../../pipes/project-matcher.pipe';

describe('ReportingComponent', () => {
    let component: ReportingComponent;
    let fixture: ComponentFixture<ReportingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportingComponent,
                LeftSidebarComponent,
                CategoryPipe,
                OrderByPipe,
                TagsPipe,
                HiddenPipe,
                DisplayOrderPipe,
                ModalComponent,
                QueryParametersComponent,
                ProjectMatcherPipe
            ],
            imports: [
                HttpClientModule,
                FormsModule,
                MatTooltipModule,
                NgbTypeaheadModule,
                MatCheckboxModule,
                BrowserAnimationsModule
            ],
            schemas: []
        }).compileComponents();

        fixture = TestBed.createComponent(ReportingComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
