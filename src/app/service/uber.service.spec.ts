import { TestBed } from '@angular/core/testing';

import { UberService } from './uber.service';

describe('UberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UberService = TestBed.get(UberService);
    expect(service).toBeTruthy();
  });
});
