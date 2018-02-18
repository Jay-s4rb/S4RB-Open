import { Injectable } from '@angular/core';
import { Month } from './../../model/month';
import { JsonService } from './../jsonApi/json.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComplaintsDataService {

  constructor(private api: JsonService) { }

  getAllProducts(): Observable<Month[]> {
    return this.api.getAllCPMU();
  }

}
