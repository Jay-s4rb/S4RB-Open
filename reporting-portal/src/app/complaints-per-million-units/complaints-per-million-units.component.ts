import { Component, OnInit, OnDestroy } from '@angular/core';

import { ComplaintsService } from '../services/complaints.service'
import { ComplaintsPerMillionUnits } from '../models/ComplaintsPerMillionUnits.model'
import { Months } from '../Enums'

import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-complaints-per-million-units',
  templateUrl: './complaints-per-million-units.component.html',
  styleUrls: ['./complaints-per-million-units.component.scss']
})
export class ComplaintsPerMillionUnitsComponent implements OnInit, OnDestroy {

  constructor(private complaintsService: ComplaintsService) { }

  public complaintsPerMillionUnitsList: Array<ComplaintsPerMillionUnits>
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // On init gets all complaints from API and assigns them complaintsPerMillionUnits
  ngOnInit() {
    this.complaintsService.getComplaintsPerMillionUnits()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(ComplaintsPerMillionUnitsList => {
      this.complaintsPerMillionUnitsList = ComplaintsPerMillionUnitsList
    })
    this.convertToDateString('2012-01-01T00:00:00')
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  } 

  public convertToDateString(date){
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    let day = new Date(date).getUTCDate();

    return day < 10 ? '0' + day + ' ' + Months[month] + ' ' + year : day + ' ' + Months[month] + ' ' + year;
  } 

}
