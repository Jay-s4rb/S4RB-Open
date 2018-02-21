import { TestBed, inject } from '@angular/core/testing';
import { JsonService } from './json.service';

describe('Json Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonService]
    });
  });

  it('should be created', inject([JsonService], (service: JsonService) => {
    expect(service).toBeTruthy();
  }));
});
