import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParametersComponent } from './query-parameters.component';

describe('QueryParametersComponent', () => {
  let component: QueryParametersComponent;
  let fixture: ComponentFixture<QueryParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
