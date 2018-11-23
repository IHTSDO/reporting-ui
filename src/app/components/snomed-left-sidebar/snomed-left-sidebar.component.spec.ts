import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedLeftSidebarComponent } from './snomed-left-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('SnomedLeftSidebarComponent', () => {
    let component: SnomedLeftSidebarComponent;
    let fixture: ComponentFixture<SnomedLeftSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SnomedLeftSidebarComponent],
            imports: [
                HttpClientModule,
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedLeftSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
