import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch'
import { of } from 'rxjs/observable/of';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';

import { Product } from './../../model/product';

const API_URL = environment.apiUrl;

@Injectable()
export class JsonService {

  constructor(private http: Http) { }



//API: Get all product CMPU listings
  getAllCPMU(): Observable<Product[]> {
      return this.http
      .get(API_URL + '/CPMU')
      .map (response => {
        const prods = response.json();
        return prods.map((prod) => new Product(prod));
      })
      .catch(this.handleError);
    }

  private handleError (error: Response | any) {
  console.error('JsonService::handleError', error);
  return Observable.throw(error);
}

}
