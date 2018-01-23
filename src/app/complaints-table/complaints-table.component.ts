import { Component, OnInit } from "@angular/core";
import { ComplaintsService } from "../complaints.service";

@Component({
  selector: "app-complaints-table",
  templateUrl: "./complaints-table.component.html",
  styleUrls: ["./complaints-table.component.css"]
})

export class ComplaintsTableComponent implements OnInit {
  constructor(private complaintsService: ComplaintsService) {}

  complaints : any = [];


  ngOnInit() {
    console.log("init");

    this.complaintsService.getAllComplaints().subscribe(results => {
      this.complaints = results;
      console.log(this.complaints);
    });
  }
}