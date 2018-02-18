import { Component, OnInit } from '@angular/core';
import { ComplaintsDataService } from './../../services/complaints-data/complaints-data.service';
import { Year } from './../../model/year';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-complaints-per-mil',
  templateUrl: './complaints-per-mil.component.html',
  styleUrls: ['./complaints-per-mil.component.scss']
})
export class ComplaintsPerMilComponent implements OnInit {

  constructor(private complaintData : ComplaintsDataService) { }

  private Year: Year[] = [];
  private showQuarters: boolean = false;

  ngOnInit() {
    this.complaintData.getAllProducts()
    .subscribe( (data) => {
      data.map((month) => {
        let thisYear = new Date(month.Date).getFullYear();
        let YearIdx: number =  this.Year.findIndex(Year => Year.Year == thisYear);
        if(YearIdx < 0){
          let newYear: Year = new Year();
          newYear.Year = thisYear;
          this.Year.push(newYear);
          YearIdx = this.Year.findIndex(Year => Year == newYear);
        }
        this.Year[YearIdx].addMonth(month);
        this.Year[YearIdx].Quarters[month.Quarter-1].addMonthToQuarter(month, month.Quarter);
      });
    });

  }

  toggleView(): void{
    this.showQuarters = !this.showQuarters;
  }

}
