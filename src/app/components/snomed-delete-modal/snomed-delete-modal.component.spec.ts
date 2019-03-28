import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnomedDeleteModalComponent } from './snomed-delete-modal.component';
import { HttpClientModule } from '@angular/common/http';

describe('SnomedDeleteModalComponent', () => {
    let component: SnomedDeleteModalComponent;
    let fixture: ComponentFixture<SnomedDeleteModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedDeleteModalComponent
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnomedDeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
