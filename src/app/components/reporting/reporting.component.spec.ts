import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../../pipes/category.pipe';

import { ReportingComponent } from './reporting.component';

describe('ReportingComponent', () => {
    const component: ReportingComponent;
    // let fixture: ComponentFixture<ReportingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportingComponent,
                CategoryPipe
            ],
            imports: [
                HttpClientModule,
                FormsModule
            ],
            schemas: []
        }).compileComponents();
    }));

    beforeEach(() => {
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
