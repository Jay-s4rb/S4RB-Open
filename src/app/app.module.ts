import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JsonService } from './services/jsonApi/json.service';
import { ComplaintsPerMilComponent } from './components/complaints-per-mil/complaints-per-mil.component';
import { ComplaintsDataService } from './services/complaints-data/complaints-data.service';



@NgModule({
  declarations: [
    AppComponent,
    ComplaintsPerMilComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    JsonService,
    ComplaintsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
