import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedLeftSidebarComponent } from './snomed-left-sidebar.component';

describe('SnomedLeftSidebarComponent', () => {
  let component: SnomedLeftSidebarComponent;
  let fixture: ComponentFixture<SnomedLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
