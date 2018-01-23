/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComplaintsService } from './complaints.service';

describe('ComplaintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintsService]
    });
  });

  it('should ...', inject([ComplaintsService], (service: ComplaintsService) => {
    expect(service).toBeTruthy();
  }));
});
