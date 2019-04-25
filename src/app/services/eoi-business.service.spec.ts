import { TestBed } from '@angular/core/testing';

import { EoiBusinessService } from './eoi-business.service';

describe('EoiBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EoiBusinessService = TestBed.get(EoiBusinessService);
    expect(service).toBeTruthy();
  });
});
