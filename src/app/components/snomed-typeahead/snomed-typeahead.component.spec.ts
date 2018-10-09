import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedTypeaheadComponent } from './snomed-typeahead.component';

describe('SnomedTypeaheadComponent', () => {
  let component: SnomedTypeaheadComponent;
  let fixture: ComponentFixture<SnomedTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
