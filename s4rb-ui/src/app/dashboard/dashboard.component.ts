import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {DataSource} from '@angular/cdk/collections';
import { RowEntry } from '../../models/rowEntry.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  consolidation = 'monthly';
  displayedColumns = [this.consolidation.slice(0, -2), 'cpmu'];
  consolidationOptions = ['monthly', 'quarterly'];
  dataSource = new DashboardDataSource(this.dashboardService, this.consolidation);
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  onToggle(): void {
    let flip = this.consolidation === 'monthly' ? 'quarterly' : 'monthly';
    // I have no idea why but it's inverted
    this.displayedColumns = [flip.slice(0, -2), 'cpmu'];
    this.dataSource = new DashboardDataSource(this.dashboardService, flip);
  }

}
export class DashboardDataSource extends DataSource<any> {
  constructor(private dashboardService: DashboardService, private consolidation) {
    super();
  }
  connect(): Observable<RowEntry[]> {
    return this.dashboardService.getData(this.consolidation);
  }
  disconnect() {}
}
