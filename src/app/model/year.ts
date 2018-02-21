import { Quarter } from './quarter';
import { Month } from './month';
import { handleError } from './../util/functions';

export class Year {

  Year: number = 0;
  Months: Month[] = [
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month(),
    new Month()
  ];
  Quarters: Quarter[] = [
    new Quarter(),
    new Quarter(),
    new Quarter(),
    new Quarter()
  ];

  constructor(year: number){
    this.Year = year;
  }

  public addMonth(month: Month){
    this.Months[new Date(month.Date).getMonth()] = month;
  }

  public fillMonthArray() {
    this.Months.forEach((month) => {
      month.setDateAndQuarter(
        new Date (
          Date.UTC(
            this.Year,
            this.Months.indexOf(month),
            1
          )), this.findQuarter(this.Months.indexOf(month)));
    });
  }

  private findQuarter(month: number): number{
    if(month <= 4){
      return 1;
    } else if(month > 3 && month <= 6){
      return 2;
    } else if(month > 6 && month <= 9){
       return 3;
    } else if(month > 3 && month <= 12){
       return 4;
    } else {
      handleError("Invalid month in findQuarter - Year Model");
    }
  }

}
