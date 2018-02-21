import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComplaintsDataService } from './../../services/complaints-data/complaints-data.service';
import { Year } from './../../model/year';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-complaints-per-mil',
  templateUrl: './complaints-per-mil.component.html',
  styleUrls: ['./complaints-per-mil.component.scss']
})
export class ComplaintsPerMilComponent implements OnInit, OnDestroy {

  constructor(private complaintData : ComplaintsDataService) { }

  private Years: Year[] = [];
  private showQuarters: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.complaintData.getAllProducts()
    .takeUntil(this.ngUnsubscribe)
    .subscribe( (data) => {
      data.map((month) => {
        let thisYear = new Date(month.Date).getFullYear();
        let YearIdx: number =  this.Years.findIndex(Year => Year.Year == thisYear);
        if(YearIdx < 0){
          let newYear: Year = new Year(thisYear);
          newYear.fillMonthArray();
          this.Years.push(newYear);
          YearIdx = this.Years.findIndex(Year => Year == newYear);
        }
        this.Years[YearIdx].addMonth(month);
        this.Years[YearIdx].Quarters[month.Quarter-1].addMonthToQuarter(month, month.Quarter);
      });
    });
  }

  toggleView(): void{
    this.showQuarters = !this.showQuarters;
  }

  ngOnDestroy(){
   this.ngUnsubscribe.next();
   this.ngUnsubscribe.complete();
 }

}
