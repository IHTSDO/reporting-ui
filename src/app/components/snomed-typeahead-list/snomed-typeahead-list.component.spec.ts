import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedTypeaheadListComponent } from './snomed-typeahead-list.component';

describe('SnomedTypeaheadListComponent', () => {
  let component: SnomedTypeaheadListComponent;
  let fixture: ComponentFixture<SnomedTypeaheadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedTypeaheadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedTypeaheadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
