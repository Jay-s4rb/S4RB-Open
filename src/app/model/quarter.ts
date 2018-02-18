import { Month } from './month';
import { calcCPMU } from './../util/functions';

export class Quarter {

  Quarter: number = 0;
  Complaints: number = 0;
  UnitsSold: number = 0;
  CPMU: number = 0;

  constructor(quart?: any){
    if(quart !== undefined){
      this.Quarter = quart.quarter;
      this.Complaints = quart.Complaints;
      this.UnitsSold = quart.UnitsSold;
      this.CPMU = calcCPMU(quart.Complaints, quart.UnitsSold);
    }
  }

  addMonthToQuarter(month: Month, quarter: number){
    this.Quarter = quarter;
    this.Complaints = this.Complaints + month.Complaints;
    this.UnitsSold = this.UnitsSold + month.UnitsSold;
    this.CPMU = calcCPMU(this.Complaints, this.UnitsSold);
  }
}
