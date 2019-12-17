import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthoringService } from './authoring.service';

describe('AuthoringService', () => {
  beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                HttpClientModule
            ],
            schemas: []
        }).compileComponents();
    });

  it('should be created', () => {
    const service: AuthoringService = TestBed.get(AuthoringService);
    expect(service).toBeTruthy();
  });
});
