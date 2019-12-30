import { TestBed } from '@angular/core/testing';

import { UboxService } from './ubox.service';

describe('UboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UboxService = TestBed.get(UboxService);
    expect(service).toBeTruthy();
  });
});
