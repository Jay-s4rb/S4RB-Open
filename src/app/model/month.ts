import { calcCPMU } from './../util/functions';

export class Month {

  Quarter: number = 0 ;
  Date: Date = new Date();
  Complaints: number = 0;
  UnitsSold: number = 0;
  CPMU: number = 0;


  constructor();
  constructor(mon: Month);
  constructor(mon?: any){
    if(mon){
      this.Quarter = mon.Quarter;
      this.Complaints = mon.Complaints;
      this.Date = mon.Month;
      this.UnitsSold = mon.UnitsSold;
      this.CPMU = calcCPMU(mon.Complaints, mon.UnitsSold);
    }
  }

  setDateAndQuarter(date: Date, quarter: number){
    this.Date = date;
    this.Quarter = quarter;
  }

}
