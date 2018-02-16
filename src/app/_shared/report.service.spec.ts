import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';


import { ReportService } from './report.service';

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ReportService]
    });
  });

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));

});
