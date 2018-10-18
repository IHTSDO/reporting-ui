import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedModalComponent } from './snomed-modal.component';

describe('SnomedModalComponent', () => {
  let component: SnomedModalComponent;
  let fixture: ComponentFixture<SnomedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
