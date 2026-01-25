import { TestBed } from '@angular/core/testing';

import { FetchLocalDataService } from './fetch-local-data.service';

describe('FetchLocalDataService', () => {
  let service: FetchLocalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchLocalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
