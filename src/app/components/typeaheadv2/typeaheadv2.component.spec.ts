import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Typeaheadv2Component } from './typeaheadv2.component';

describe('Typeaheadv2Component', () => {
  let component: Typeaheadv2Component;
  let fixture: ComponentFixture<Typeaheadv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Typeaheadv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Typeaheadv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
