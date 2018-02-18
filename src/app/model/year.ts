import { Quarter } from './quarter';
import { Month } from './month';

export class Year {

  Year: number = 0;

  Quarters: Quarter[] = [
    new Quarter(),
    new Quarter(),
    new Quarter(),
    new Quarter()
  ];
  Months: Month[] = [];

  constructor(){}

  addMonth(month: Month){
    this.Months.push(month);
  }

}
