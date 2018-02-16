import { Component, OnInit } from '@angular/core';

import { ReportService } from '../_shared/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = 'Complaints per million units';
  CPMUMonths: Array<Object> = [];
  CMPUQuarter: Array<Object> = [];
  byMonth = true;

  constructor(private reportService : ReportService) {}

  ngOnInit() {
    // Get CPMUs group by Month
    this.reportService.getCPMU().then(res => {
      this.CPMUMonths = res;
    });
    // Get CPMUs group by Quarter
    this.reportService.getCPMUByQuarter().then(res => {
      this.CMPUQuarter = res;
    });
  }

  toggle() {
    // Change Table
    this.byMonth = !this.byMonth;
  }

}
