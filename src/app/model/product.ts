export class Product {

  constructor(prod: any){
    this.Quarter = prod.Quater;
    this.Complaints = prod.Complaints;
    this.Date = prod.Month;
    this.UnitsSold = prod.UnitsSold;
    this.CPMU = (prod.Complaints/prod.UnitsSold)*1000000;
  }

  Quarter: number ;
  Date: Date;
  Complaints: number;
  UnitsSold: number;
  CPMU: number;
}
