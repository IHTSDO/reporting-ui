import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnomedWhitelistModalComponent } from './snomed-whitelist-modal.component';

describe('SnomedWhitelistModalComponent', () => {
  let component: SnomedWhitelistModalComponent;
  let fixture: ComponentFixture<SnomedWhitelistModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnomedWhitelistModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnomedWhitelistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
