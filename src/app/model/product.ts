export class Product {

  constructor(prod: any){
    this.Quarter = prod.Quater;
    this.Complaints = prod.Complaints;
    this.Month = prod.Month;
    this.UnitsSold = prod.UnitsSold;
  }

  Quarter: number ;
  Month: Date;
  Complaints: number;
  UnitsSold: number;
}
