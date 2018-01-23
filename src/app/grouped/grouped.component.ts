import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from "../complaints.service";

@Component({
  selector: 'app-grouped',
  templateUrl: './grouped.component.html',
  styleUrls: ['./grouped.component.css']
})
export class GroupedComponent implements OnInit {
  constructor(private complaintsService: ComplaintsService) {}

  complaints : any = [];

  ngOnInit() {

    this.complaintsService.getGroupedComplaints().subscribe(results => {
      this.complaints = results;
      console.log(this.complaints);
    });
  }
}
