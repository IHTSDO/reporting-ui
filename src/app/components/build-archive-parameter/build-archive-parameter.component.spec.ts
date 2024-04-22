import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildArchiveParameterComponent } from './build-archive-parameter.component';

describe('BuildArchiveParameterComponent', () => {
  let component: BuildArchiveParameterComponent;
  let fixture: ComponentFixture<BuildArchiveParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildArchiveParameterComponent]
    });
    fixture = TestBed.createComponent(BuildArchiveParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
