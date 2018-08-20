import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedReportCellComponent } from './snomed-report-cell.component';

describe('SnomedReportCellComponent', () => {
  let component: SnomedReportCellComponent;
  let fixture: ComponentFixture<SnomedReportCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedReportCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedReportCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
