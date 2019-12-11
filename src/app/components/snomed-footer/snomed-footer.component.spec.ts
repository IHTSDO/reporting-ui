import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SnomedFooterComponent } from './snomed-footer.component';

describe('SnomedFooterComponent', () => {
    let component: SnomedFooterComponent;
    let fixture: ComponentFixture<SnomedFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedFooterComponent
            ],
            imports: [
                FormsModule
            ],
            schemas: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
