import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';
import { handleError } from './../../util/functions';
import { Month } from './../../model/month';

const API_URL = environment.apiUrl;

@Injectable()
export class JsonService {

  constructor(private http: Http) { }



//API: Get all product CMPU listings
  getAllCPMU(): Observable<Month[]> {
      return this.http
      .get(API_URL + '/CPMU')
      .map (response => {
        const entries = response.json();
        return entries.map((entry) => new Month(entry));
      })
      .catch(handleError);
    }
}
