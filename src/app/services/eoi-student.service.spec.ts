import { TestBed } from '@angular/core/testing';

import { EoiStudentService } from './eoi-student.service';

describe('EoiStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EoiStudentService = TestBed.get(EoiStudentService);
    expect(service).toBeTruthy();
  });
});
