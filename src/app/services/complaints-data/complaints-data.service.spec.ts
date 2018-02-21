import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ComplaintsDataService } from './complaints-data.service';
import { Month } from './../../model/month';

describe('ComplaintsDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintsDataService,
                  {provide: XHRBackend, useClass: MockBackend}],
      imports: [HttpModule]
    });
  }));

  it('should be created', inject([ComplaintsDataService], (service: ComplaintsDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('GET function', () => {
    it('should return an Observable<any>',
        inject([ComplaintsDataService, XHRBackend],
        (complaintsData: ComplaintsDataService,  mockBackend: MockBackend) => {
          const testData = {
            data: [
              {
                Quarter: "1",
                Month: "2018-02-20T00:00:00",
                Complaints: 1,
                UnitsSold: 1000000,
                CPMU: 1
              },
              {
                Quarter: "2",
                Month: "2017-02-20T00:00:00",
                Complaints: 500,
                UnitsSold: 500000,
                CPMU: 3.1415
              },
              {
                Quarter: "3",
                Month: "2016-02-20T00:00:00",
                Complaints: 12345,
                UnitsSold: 67891,
                CPMU: 42
              }
            ]
          };

          mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(testData)
            })));
          });

          complaintsData.getAllProducts().subscribe((MonthArray) => {
            console.log(MonthArray);
            expect(MonthArray.length).toBe(3);
            expect(MonthArray[0].Quarter).toEqual('1');
            expect(MonthArray[1].Quarter).toEqual('2');
            expect(MonthArray[2].Quarter).toEqual('3');
            expect(MonthArray[0].Date).toEqual('2018-02-20T00:00:00');
            expect(MonthArray[1].Date).toEqual('2017-02-20T00:00:00');
            expect(MonthArray[2].Date).toEqual('2016-02-20T00:00:00');
            expect(MonthArray[0].Complaints).toEqual(1);
            expect(MonthArray[1].Complaints).toEqual(500);
            expect(MonthArray[2].Complaints).toEqual(12345);
            expect(MonthArray[0].UnitsSold).toEqual(1000000);
            expect(MonthArray[1].UnitsSold).toEqual(500000);
            expect(MonthArray[2].UnitsSold).toEqual(67891);
            expect(MonthArray[0].CPMU).toEqual(1);
            expect(MonthArray[1].CPMU).toEqual(3.1415);
            expect(MonthArray[2].CPMU).toEqual(42);
          });
    }));
  });

});
