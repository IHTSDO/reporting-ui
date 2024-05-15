import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseArchiveParameterComponent } from './release-archive-parameter.component';

describe('ReleaseArchiveParameterComponent', () => {
  let component: ReleaseArchiveParameterComponent;
  let fixture: ComponentFixture<ReleaseArchiveParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseArchiveParameterComponent]
    });
    fixture = TestBed.createComponent(ReleaseArchiveParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
