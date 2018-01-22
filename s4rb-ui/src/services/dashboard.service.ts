import { Injectable }   from '@angular/core';
import { HttpClient, HttpParams }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RowEntry } from '../models/rowEntry.model';
@Injectable()
export class DashboardService {
  private serviceUrl = 'http://localhost:3001/cpmu';

  constructor(private http: HttpClient) { }

  getData(consolidation): Observable<RowEntry[]> {
    let params = new HttpParams().set('consolidation', consolidation);
    return this.http.get<RowEntry[]>(this.serviceUrl, { params: params });
  };

}
