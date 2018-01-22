import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ComplaintsService } from './complaints.service';
import { Constants } from '../Constants'
import { ComplaintsPerMillionUnits } from '../models/ComplaintsPerMillionUnits.model'


describe('ComplaintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintsService, 
                  {provide: XHRBackend, useClass: MockBackend}],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([ComplaintsService], (service: ComplaintsService) => {
    expect(service).toBeTruthy();
  }));

  describe('GET methods', () => {
    it('should return an Observable<any>', 
        inject([ComplaintsService, XHRBackend], 
        (complaintsService: ComplaintsService,  mockBackend: MockBackend) => {
          const mockResponse = {
            data: [
              { 
                Quarter: "1",
                Month: "2012-01-01T00:00:00",
                Complaints: 27,
                UnitsSold: 4932508,
                CPMU: 5.47388874
              },
              { 
                Quarter: "1",
                Month: "2012-02-01T00:00:00",
                Complaints: 5,
                UnitsSold: 86720,
                CPMU: 57.65682657
              }
            ]
          };

          mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
          });

          complaintsService.getCPMUDataMonthly().subscribe((ComplaintsPerMillionUnits) => {
            const data = ComplaintsPerMillionUnits.data
            console.log(data)
            expect(data.length).toBe(2);
            expect(data[0].Quarter).toEqual('1');
            expect(data[0].Month).toEqual('2012-01-01T00:00:00');
            expect(data[1].Complaints).toEqual(5);
            expect(data[1].UnitsSold).toEqual(86720);
            expect(data[1].CPMU).toEqual(57.65682657);
          });

          complaintsService.getCPMUDataQuarterly().subscribe((ComplaintsPerMillionUnits) => {
            const data = ComplaintsPerMillionUnits.data
            expect(data.length).toBe(2);
            expect(data[0].Quarter).toEqual('1');
            expect(data[0].Month).toEqual('2012-01-01T00:00:00');
            expect(data[1].Complaints).toEqual(5);
            expect(data[1].UnitsSold).toEqual(86720);
            expect(data[1].CPMU).toEqual(57.65682657);
          });
    }));
  });

});
