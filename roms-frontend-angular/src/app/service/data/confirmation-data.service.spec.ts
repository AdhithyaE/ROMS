import { TestBed } from '@angular/core/testing';

import { ConfirmationDataService } from './confirmation-data.service';

describe('ConfirmationDataService', () => {
  let service: ConfirmationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
