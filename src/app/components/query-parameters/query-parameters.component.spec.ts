import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { QueryParametersComponent } from './query-parameters.component';

describe('QueryParametersComponent', () => {
  let component: QueryParametersComponent;
  let fixture: ComponentFixture<QueryParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ 
            QueryParametersComponent 
        ],
        imports: [
            FormsModule
        ],
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
