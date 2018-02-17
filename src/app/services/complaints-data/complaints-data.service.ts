import { Injectable } from '@angular/core';
import { Product } from './../../model/product';
import { JsonService } from './../jsonApi/json.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComplaintsDataService {

  constructor(private api: JsonService) { }

  products: Product[] = [];

  getAllProducts(): Observable<Product[]> {
    return this.api.getAllCPMU();
  }


}
