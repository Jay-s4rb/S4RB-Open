import { Component, OnInit, OnDestroy } from '@angular/core';

import { ComplaintsService } from '../services/complaints.service'
import { ComplaintsPerMillionUnits } from '../models/ComplaintsPerMillionUnits.model'


import { Subject } from 'rxjs/Subject';
import { Constants } from '../Constants';


@Component({
  selector: 'app-complaints-per-million-units',
  templateUrl: './complaints-per-million-units.component.html',
  styleUrls: ['./complaints-per-million-units.component.scss']
})
export class ComplaintsPerMillionUnitsComponent implements OnInit, OnDestroy {

  constructor(private complaintsService: ComplaintsService) { }

  public CPMUListMonthly: Array<ComplaintsPerMillionUnits>
  public CPMUDataQuarterly: Array<ComplaintsPerMillionUnits>
  public complaintYears: Array<string>;
  public quarters = Constants.quarters;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // On init gets all complaints from API and assigns them complaintsPerMillionUnits
  ngOnInit() {
    this.complaintsService.getCPMUDataMonthly()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(CPMUListMonthly => {
      this.CPMUListMonthly = CPMUListMonthly
    })

    this.complaintsService.getCPMUDataQuarterly()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(CPMUDataQuarterly => {
      this.CPMUDataQuarterly = CPMUDataQuarterly
      this.complaintYears = Object.keys(CPMUDataQuarterly)
    })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  } 

}
