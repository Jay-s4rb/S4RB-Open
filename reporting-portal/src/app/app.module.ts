import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units/complaints-per-million-units.component';
import { ToggleComponent } from './shared/toggle/toggle.component';


@NgModule({
  declarations: [
    AppComponent,
    ComplaintsPerMillionUnitsComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
