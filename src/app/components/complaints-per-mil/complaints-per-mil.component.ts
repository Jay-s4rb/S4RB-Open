import { Component, OnInit } from '@angular/core';
import { ComplaintsDataService } from './../../services/complaints-data/complaints-data.service';
import { Product } from './../../model/product';

@Component({
  selector: 'app-complaints-per-mil',
  templateUrl: './complaints-per-mil.component.html',
  styleUrls: ['./complaints-per-mil.component.scss']
})
export class ComplaintsPerMilComponent implements OnInit {

  constructor(private complaintData : ComplaintsDataService) { }

  private productList: Product[] = [];

  ngOnInit() {
    this.complaintData.getAllProducts()
    .subscribe( (products) => {
      this.productList = products;
    });
  }

}
