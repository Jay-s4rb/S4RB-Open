import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComplaintsTableComponent } from './complaints-table/complaints-table.component';
import { ComplaintsService } from './complaints.service';
import { GroupedComponent } from './grouped/grouped.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'complaints',
    pathMatch: 'full'
  },
  {
    path: 'complaints',
    component: ComplaintsTableComponent
  },
  {
    path: 'grouped',
    component: GroupedComponent
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    ComplaintsTableComponent,
    GroupedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ComplaintsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
