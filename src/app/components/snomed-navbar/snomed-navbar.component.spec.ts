import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SnomedNavbarComponent } from './snomed-navbar.component';

describe('SnomedNavbarComponent', () => {
    let component: SnomedNavbarComponent;
    let fixture: ComponentFixture<SnomedNavbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedNavbarComponent
            ],
            imports: [
                FormsModule,
                HttpClientModule
            ],
            schemas: []
        }).compileComponents();

        fixture = TestBed.createComponent(SnomedNavbarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
