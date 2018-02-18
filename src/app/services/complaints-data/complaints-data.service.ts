import { Injectable } from '@angular/core';
import { Product } from './../../model/product';
import { JsonService } from './../jsonApi/json.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";

@Injectable()
export class ComplaintsDataService {

  constructor(private api: JsonService) { }

  getAllProducts(): Observable<Product[]> {
    return this.api.getAllCPMU();
  }


}
