import { TestBed, inject } from '@angular/core/testing';

import { ComplaintsDataService } from './complaints-data.service';

describe('ComplaintsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintsDataService]
    });
  });

  it('should be created', inject([ComplaintsDataService], (service: ComplaintsDataService) => {
    expect(service).toBeTruthy();
  }));
});
