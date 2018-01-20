import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Constants } from '../Constants'
import { ComplaintsPerMillionUnitsComponent } from '../complaints-per-million-units/complaints-per-million-units.component';
import { ComplaintsPerMillionUnits } from '../models/ComplaintsPerMillionUnits.model'


@Injectable()
export class ComplaintsService {

  constructor(public http: Http) {

  }

  private complaintsPerMillionUnitsUrl = Constants.baseUrl + '/CPMU';


  // On subscribe returns an array of complaintsPerMillionUnits
  public getComplaintsPerMillionUnits(): Observable<any> {
    return this.http.get(this.complaintsPerMillionUnitsUrl)
    .map(complaintsPerMillionUnitsList => {
      return complaintsPerMillionUnitsList.json() as Array<ComplaintsPerMillionUnits>
    })
    .catch(err => {
      return Observable.throw(err)
    })
  }
 
}
