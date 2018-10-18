import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedOverlayComponent } from './snomed-overlay.component';

describe('SnomedOverlayComponent', () => {
  let component: SnomedOverlayComponent;
  let fixture: ComponentFixture<SnomedOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
