import { TestBed } from '@angular/core/testing';

import { EventStoreService } from './event-store.service';

describe('EventStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventStoreService = TestBed.get(EventStoreService);
    expect(service).toBeTruthy();
  });
});
